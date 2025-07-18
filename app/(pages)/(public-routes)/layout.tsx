import MainLayout from "@/app/components/MainLayout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}