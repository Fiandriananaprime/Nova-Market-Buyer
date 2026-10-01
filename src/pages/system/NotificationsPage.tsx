import { Bell, Check, CheckCheck, Package, Sparkles, X } from 'lucide-react';
import * as UI from '../../lib/ui';
import { Button, PageTitle, Empty, useShop } from '../../components/shared';
export const NotificationsPage = () => {
  const { notifications, setNotifications } = useShop();
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px] max-w-[900px]">
      <PageTitle
        eyebrow="RESTEZ INFORMÉ"
        title="Notifications"
        description="Tout ce qui compte, au même endroit."
        action={
          <Button
            variant="ghost"
            onClick={() =>
              setNotifications((old) => old.map((n) => ({ ...n, read: true })))
            }
          >
            <CheckCheck size={18} /> Tout marquer comme lu
          </Button>
        }
      />
      {notifications.length ? (
        <div className="border-t border-[var(--color-parchment-200)]">
          {notifications.map((n) => (
            <div
              className={`flex items-start gap-4 border-b border-[var(--color-parchment-200)] p-5 ${!n.read ? 'bg-[var(--color-parchment-50)]' : ''}`}
              key={n.id}
            >
              <div className="grid size-10 flex-none place-items-center rounded-full bg-[var(--color-tropical-teal-100)] text-[var(--color-smart-blue-950)]">
                {n.type === 'order' ? (
                  <Package size={21} />
                ) : (
                  <Sparkles size={21} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <strong className="block text-[13px]">{n.title}</strong>
                <p className="mt-1 text-[12px] text-[var(--color-ink-muted)]">{n.message}</p>
                <small className="mt-2 block text-[10px] text-[var(--color-ink-faint)]">Récemment</small>
              </div>
              <UI.Button
                aria-label="Marquer comme lu"
                onClick={() =>
                  setNotifications((old) =>
                    old.map((item) =>
                      item.id === n.id ? { ...item, read: true } : item,
                    ),
                  )
                }
              >
                {!n.read ? (
                  <span className="size-2 rounded-full bg-[var(--color-smart-blue-500)]" />
                ) : (
                  <Check size={16} />
                )}
              </UI.Button>
              <UI.Button
                aria-label="Supprimer"
                onClick={() =>
                  setNotifications((old) =>
                    old.filter((item) => item.id !== n.id),
                  )
                }
              >
                <X size={17} />
              </UI.Button>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          icon={Bell}
          title="Tout est à jour"
          text="Vos prochaines nouvelles apparaîtront ici."
        />
      )}
    </div>
  );
};
