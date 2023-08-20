import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

type IItems = Array<{ name: string; path: string }>;

export interface IProps {
  items: IItems;
}

const Nav = ({ items }: IProps) => {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.path}
          className="block rounded-lg bg-slate-900/10 py-2 px-4 text-white hover:bg-slate-900/20 hover:text-white font-bold text-center transform-all duration-100 active:bg-slate-500/50 md:inline-block"
          to={item.path}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

const MobilePopover = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className={`float-right my-1 mr-6 h-8 w-8 rounded ${open ? 'bg-slate-900/20' : 'bg-slate-900/10'} p-1 outline-none active:bg-slate-500/30 md:hidden`}>
            <Bars3Icon className="h-6 w-6 stroke-white" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-6 z-10 mt-14 w-60 max-w-sm transform space-y-2 rounded-2xl bg-slate-900/20 p-2 shadow-lg backdrop-blur-lg md:px-0 lg:max-w-3xl">
              {children}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const Header = ({ items }: { items: IItems }) => {
  return (
    <div className="relative z-10 w-full bg-white/20 py-2 backdrop-blur after:clear-both after:block">
      <MobilePopover>
        <Nav items={items} />
      </MobilePopover>
      <div className="float-right mr-4 hidden space-x-2 md:flex">
        <Nav items={items} />
      </div>
    </div>
  );
};

export default Header;
