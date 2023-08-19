import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

type IItems = Array<{ name: string; path: string }>;

const Nav = ({ items }: { items: IItems }) => {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.path}
          className="block md:inline-block bg-slate-500/20 py-1 px-2 rounded text-cyan-200 hover:text-cyan-300 hover:underline"
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
          <Popover.Button className="md:hidden w-6 h-6 my-1 mr-6 float-right outline-none bg-slate-500/20 active:bg-slate-500/30 rounded">
            <Bars3Icon className="w-6 h-6 stroke-slate-300" />
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
            <Popover.Panel className="absolute right-6 z-10 mt-12 w-60 max-w-sm transform shadow-lg sm:px-0 lg:max-w-3xl bg-white/100 backdrop-blur rounded-lg p-4 space-y-2">
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
    <div className="w-full relative z-10 backdrop-blur bg-white/20 after:block after:clear-both py-2">
      <MobilePopover>
        <Nav items={items} />
      </MobilePopover>
      <div className="hidden md:flex float-right space-x-2 mr-4">
        <Nav items={items} />
      </div>
    </div>
  );
};

export default Header;
