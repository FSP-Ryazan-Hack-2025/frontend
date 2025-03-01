'use client';

import { withAuth } from '@/shared/hoc';
import { Button, Card, CardContent } from '@/shared/ui';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, LaptopMinimalCheck, ShieldCheck, Tablet, TvMinimal } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

function Home() {
    

    return (
        <>Home</>
    );
}

export default withAuth(Home);
