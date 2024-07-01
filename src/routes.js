import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdChat,
  MdHome,
  MdQuestionAnswer,
} from "react-icons/md";

// Admin Imports

import Respostas from "views/admin/default/Resposta/Respostas";
import Principal from "views/admin/default";
import Perguntas from "views/admin/default/Pergunta/Pergunta";
import Login from "views/admin/default/Login";
import Arquivos from "views/admin/default/Arquivos";

const routes = [
  {
    name: "Início",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Principal,
  },
  {
    name: "Perguntas",
    layout: "/admin",
    path: "/perguntas",
    icon: <Icon as={MdChat} width='20px' height='20px' color='inherit' />,
    component: Perguntas,
  },
  {
    name: "Respostas",
    layout: "/admin",
    path: "/respostas",
    icon: (
      <Icon
        as={MdQuestionAnswer}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Respostas,
    secondary: true,
  },
  {
    name: "Arquivos",
    layout: "/admin",
    path: "/arquivos",
    icon: (
      <Icon
        as={MdQuestionAnswer}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Arquivos,
    secondary: true,
  }
];

export default routes;
