import { useFiltro } from "@contexts/filtro";
import {  useMediaQuery } from "@geist-ui/react";
import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Settings,
  User,
} from "@geist-ui/react-icons";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SubMenu,
} from "react-pro-sidebar";

interface IProps {
  setCollapsed(collapsed: boolean): void;
  setToggled(toggled: boolean): void;
  collapsed: boolean;
  toggled: boolean;
}

export default function MenuLateral({
  collapsed,
  setCollapsed,
  toggled,
  setToggled,
}: IProps) {
  const [session] = useSession();
  const router = useRouter();
  const { limpar } = useFiltro();
  

  const isMD = useMediaQuery("lg");

  async function sair() {
    await limpar();
    signOut();
  }

  return (
    <aside>
      <ProSidebar
        breakPoint="sm"
        collapsed={isMD ? collapsed : false}
        width={"13.5rem"}
        toggled={toggled}
        onToggle={() => setToggled(!toggled)}
      >
        <SidebarContent>
          <Menu iconShape="circle">
            {isMD && (
              <MenuItem
                icon={collapsed ? <ChevronsRight /> : <ChevronsLeft />}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
            <MenuItem icon={<img src="images/actionsys.jpg" style={{objectFit: "contain", borderRadius: "50%"}} />} onClick={() => router.push("/dashboard")}>
              Actionsys
            </MenuItem>
           
            <SubMenu title="Configurações" icon={<Settings />}>
               <MenuItem onClick={() => router.push("/empresas")}>
                Cadastro de Empresa
              </MenuItem>
               <MenuItem onClick={() => router.push("/planos")}>
                Cadastro de Plano
              </MenuItem>
              </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="circle">
            <SubMenu title={session?.usuario?.nome} icon={<User />}>
              <MenuItem onClick={() => router.push("/trocar-senha")}>
                Trocar senha
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<LogOut />} onClick={sair}>
              Sair
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </aside>
  );
}
