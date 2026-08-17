'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface FeaturedSlide {
  slug: string;
  title: string;
  image: string;
}

/**
 * 히어로 — 정적 문구(좌) + 추천 아티클 이미지(우) + 좌하단 ‹ › 화살표.
 *
 * 디자인(Figma node 3513-415481)의 히어로 좌하단에 화살표 두 개가 있는데, 그 자리의
 * 본문은 로렘이라 화살표가 제목까지 바꾸는지 이미지만 바꾸는지는 알 수 없다.
 * 제목·설명은 정적으로 두고 화살표는 이미지와 링크만 넘기는 쪽을 택했다 — 홈의
 * h1 은 페이지 주제여야 하고, 회전하는 아티클 제목이 h1 이 되면 색인되는 주제가
 * 매번 달라진다. 그 문구는 `children` 으로 서버에서 내려온다.
 *
 * 화살표 상태는 컴포넌트 안에만 있다. URL 쿼리(?f=2)를 쓰면 같은 내용의 URL 변형이
 * 생기는데, 이 도메인은 "발견됨 – 크롤 안 됨" 이 2,000건 넘는 크롤 예산 부족
 * 상태라 변형을 더 얹을 이유가 없다.
 *
 * 첫 슬라이드만 priority — 이 이미지가 페이지의 LCP 요소다.
 */
export default function FeaturedCarousel({
  slides,
  basePath,
  prevLabel,
  nextLabel,
  children,
}: {
  slides: FeaturedSlide[];
  basePath: string;
  prevLabel: string;
  nextLabel: string;
  /** 좌측 컬럼 상단의 정적 문구(제목·설명·검색). */
  children: ReactNode;
}) {
  const [i, setI] = useState(0);

  const n = slides.length;
  const cur = n > 0 ? slides[i % n] : null;
  const go = (d: number) => setI((prev) => (prev + d + n) % n);

  return (
    <>
      <div className="blog-featured__text">
        <div className="blog-featured__copy">{children}</div>

        {n > 1 && (
          <div className="blog-featured__nav">
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => go(-1)}
              aria-label={prevLabel}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/ui/arrow-left.svg" alt="" width={36} height={36} />
            </button>
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => go(1)}
              aria-label={nextLabel}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/ui/arrow-right.svg" alt="" width={36} height={36} />
            </button>
          </div>
        )}
      </div>

      {cur && (
        <Link className="blog-featured__media" href={`${basePath}/${cur.slug}`}>
          <Image
            src={cur.image}
            alt={cur.title}
            fill
            sizes="(max-width: 960px) 100vw, 530px"
            priority={i === 0}
            className="object-cover"
          />
        </Link>
      )}
    </>
  );
}
