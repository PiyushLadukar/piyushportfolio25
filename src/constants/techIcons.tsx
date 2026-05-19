import type { IconType } from "react-icons";
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiExpress,
  SiFastapi, SiFlask, SiTailwindcss, SiHtml5, SiCss, SiPostgresql,
  SiMysql, SiSupabase, SiMongodb, SiDocker, SiGit, SiGithub, SiPostman,
  SiVercel, SiRender, SiOpencv, SiPandas, SiNumpy, SiScikitlearn,
  SiLangchain, SiSqlalchemy, SiJsonwebtokens,
} from "react-icons/si";
import { TbBrandReact, TbBrain, TbDatabase, TbApi } from "react-icons/tb";

export const TECH_ICON: Record<string, { Icon: IconType; color: string }> = {
  python:        { Icon: SiPython,       color: "#3776AB" },
  javascript:    { Icon: SiJavascript,   color: "#F7DF1E" },
  typescript:    { Icon: SiTypescript,   color: "#3178C6" },
  sql:           { Icon: TbDatabase,     color: "#0EA5E9" },
  react:         { Icon: SiReact,        color: "#61DAFB" },
  "react.js":    { Icon: SiReact,        color: "#61DAFB" },
  html:          { Icon: SiHtml5,        color: "#E34F26" },
  css:           { Icon: SiCss,         color: "#1572B6" },
  tailwind:      { Icon: SiTailwindcss,  color: "#06B6D4" },
  "node.js":     { Icon: SiNodedotjs,    color: "#5FA04E" },
  node:          { Icon: SiNodedotjs,    color: "#5FA04E" },
  "express.js":  { Icon: SiExpress,      color: "#000000" },
  express:       { Icon: SiExpress,      color: "#000000" },
  fastapi:       { Icon: SiFastapi,      color: "#009688" },
  flask:         { Icon: SiFlask,        color: "#000000" },
  pandas:        { Icon: SiPandas,       color: "#150458" },
  numpy:         { Icon: SiNumpy,        color: "#013243" },
  "scikit-learn":{ Icon: SiScikitlearn,  color: "#F7931E" },
  opencv:        { Icon: SiOpencv,       color: "#5C3EE8" },
  langchain:     { Icon: SiLangchain,    color: "#1C3C3C" },
  langgraph:     { Icon: SiLangchain,    color: "#1C3C3C" },
  rag:           { Icon: TbBrain,        color: "#7C3AED" },
  "vector db":   { Icon: TbDatabase,     color: "#7C3AED" },
  ml:            { Icon: TbBrain,        color: "#7C3AED" },
  nlp:           { Icon: TbBrain,        color: "#7C3AED" },
  ai:            { Icon: TbBrain,        color: "#7C3AED" },
  postgresql:    { Icon: SiPostgresql,   color: "#4169E1" },
  mysql:         { Icon: SiMysql,        color: "#4479A1" },
  supabase:      { Icon: SiSupabase,     color: "#3FCF8E" },
  sqlalchemy:    { Icon: SiSqlalchemy,   color: "#D71F00" },
  mongodb:       { Icon: SiMongodb,      color: "#47A248" },
  git:           { Icon: SiGit,          color: "#F05032" },
  github:        { Icon: SiGithub,       color: "#181717" },
  docker:        { Icon: SiDocker,       color: "#2496ED" },
  postman:       { Icon: SiPostman,      color: "#FF6C37" },
  vercel:        { Icon: SiVercel,       color: "#000000" },
  render:        { Icon: SiRender,       color: "#46E3B7" },
  jwt:           { Icon: SiJsonwebtokens,color: "#000000" },
  oauth:         { Icon: SiJsonwebtokens,color: "#2F6FB7" },
  beautifulsoup: { Icon: TbApi,          color: "#0EA5E9" },
};

export function getTechIcon(name: string) {
  const key = name.toLowerCase().trim();
  return TECH_ICON[key] ?? { Icon: TbBrandReact, color: "#64748B" };
}
