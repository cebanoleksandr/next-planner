'use client';

import { FC, HTMLAttributes, KeyboardEvent, useState } from "react";
import cn from "classnames";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Search: FC<IProps> = ({ className, ...rest }) => {
  const t = useTranslations('SearchBar');

  const [search, setSearch] = useState('');

  const router = useRouter();

  const goToSearch = () => {
    router.push(`/search?q=${search}`)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  }

  return (
    <div { ...rest } className={cn('relative w-full', className)}>
      <Input
        className="w-full pr-11"
        placeholder={t('placeholder')}
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        mode="primary"
        className="absolute top-1 right-1 size-8"
        onClick={goToSearch}
      >
        <MagnifyingGlassIcon className="size-5 -mx-1.5 -my-1" />
      </Button>
    </div>
  )
}

export default Search;
