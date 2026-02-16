import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProjectStore = create(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Date.now(), createdAt: new Date().toISOString() }]
      })),
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      })),
      updateProject: (id, data) => set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? { ...p, ...data } : p))
      })),
    }),
    {
      name: 'drone-edu-storage',
    }
  )
);
