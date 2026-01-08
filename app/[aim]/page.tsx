"use client";

import Column from "@/components/business/aims/Column";
import { useAppSelector } from "@/storage/hooks";
import { IGoal } from "@/utils/interfaces";
import { notFound, usePathname } from "next/navigation";
import { useMemo } from "react";

const AimPage = () => {
  const pathname = usePathname();
  const options = useAppSelector((state) => state.sidebarItems.items);

  const goalType = useMemo(() => {
    return options.find((item) => item.href === pathname);
  }, [pathname, options]);

  if (!goalType) {
    notFound();
  }

  const goalCards: IGoal[] = [
  {
    id: '1',
    goalTypeId: 'health',
    title: 'Morning workout',
    description: '20 minutes of exercise every morning',
    labels: [{ id: 'l1', title: 'Health', color: '#22c55e' }],
    checkList: [
      { id: 'c1', title: 'Warm up', isChecked: true },
      { id: 'c2', title: 'Main workout', isChecked: false },
      { id: 'c3', title: 'Stretching', isChecked: false },
    ],
  },
  {
    id: '2',
    goalTypeId: 'career',
    title: 'Learn TypeScript',
    description: 'Complete advanced TypeScript topics',
    labels: [{ id: 'l2', title: 'Career', color: '#3b82f6' }],
    checkList: [
      { id: 'c4', title: 'Generics', isChecked: true },
      { id: 'c5', title: 'Utility types', isChecked: false },
      { id: 'c6', title: 'Decorators', isChecked: false },
    ],
  },
  {
    id: '3',
    goalTypeId: 'finance',
    title: 'Monthly budget review',
    description: 'Analyze income and expenses',
    labels: [{ id: 'l3', title: 'Finance', color: '#f59e0b' }],
    checkList: [
      { id: 'c7', title: 'Check income', isChecked: true },
      { id: 'c8', title: 'Review expenses', isChecked: true },
      { id: 'c9', title: 'Plan savings', isChecked: false },
    ],
  },
  {
    id: '4',
    goalTypeId: 'learning',
    title: 'Read a book',
    description: 'Read 30 pages per day',
    labels: [{ id: 'l4', title: 'Learning', color: '#8b5cf6' }],
    checkList: [
      { id: 'c10', title: 'Choose a book', isChecked: true },
      { id: 'c11', title: 'Read pages', isChecked: false },
    ],
  },
  {
    id: '5',
    goalTypeId: 'work',
    title: 'Weekly planning',
    description: 'Plan tasks for the upcoming week',
    labels: [{ id: 'l5', title: 'Work', color: '#06b6d4' }],
    checkList: [
      { id: 'c12', title: 'Review last week', isChecked: true },
      { id: 'c13', title: 'Set priorities', isChecked: false },
    ],
  },
  {
    id: '6',
    goalTypeId: 'mindfulness',
    title: 'Meditation',
    description: '10 minutes of daily meditation',
    labels: [{ id: 'l6', title: 'Mindfulness', color: '#ec4899' }],
    checkList: [
      { id: 'c14', title: 'Breathing', isChecked: true },
      { id: 'c15', title: 'Focus', isChecked: false },
    ],
  },
  {
    id: '7',
    goalTypeId: 'social',
    title: 'Call parents',
    description: 'Have a meaningful conversation',
    labels: [{ id: 'l7', title: 'Family', color: '#10b981' }],
    checkList: [
      { id: 'c16', title: 'Call', isChecked: false },
      { id: 'c17', title: 'Talk', isChecked: false },
    ],
  },
  {
    id: '8',
    goalTypeId: 'hobby',
    title: 'Practice guitar',
    description: 'Learn and practice a new song',
    labels: [{ id: 'l8', title: 'Hobby', color: '#f97316' }],
    checkList: [
      { id: 'c18', title: 'Chords', isChecked: true },
      { id: 'c19', title: 'Strumming', isChecked: false },
    ],
  },
  {
    id: '9',
    goalTypeId: 'productivity',
    title: 'Clean workspace',
    description: 'Organize desk and digital files',
    labels: [{ id: 'l9', title: 'Productivity', color: '#64748b' }],
    checkList: [
      { id: 'c20', title: 'Desk', isChecked: true },
      { id: 'c21', title: 'Computer', isChecked: false },
      { id: 'c22', title: 'Notes', isChecked: false },
    ],
  },
  {
    id: '10',
    goalTypeId: 'health',
    title: 'Drink more water',
    description: 'Drink at least 2 liters of water per day',
    labels: [{ id: 'l10', title: 'Health', color: '#0ea5e9' }],
    checkList: [
      { id: 'c23', title: 'Morning', isChecked: true },
      { id: 'c24', title: 'Afternoon', isChecked: false },
      { id: 'c25', title: 'Evening', isChecked: false },
    ],
  },
];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column title={goalType.title} goalCards={goalCards} />

      <div className="flex-1">CHART</div>
    </div>
  );
};

export default AimPage;
