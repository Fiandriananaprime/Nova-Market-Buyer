import { Bell, Check, CheckCheck, Package, Sparkles, X } from 'lucide-react';
import * as UI from '../../lib/ui';
import { Button, PageTitle, Empty, useShop } from '../../components/shared';
export const NotificationsPage = () => {
  const { notifications, setNotifications } = useShop();
  return (
    <div className="container page narrow-page">
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
        <div className="notification-list">
          {notifications.map((n) => (
            <div
              className={`notification-row ${!n.read ? 'unread' : ''}`}
              key={n.id}
            >
              <div className="notification-icon">
                {n.type === 'order' ? (
                  <Package size={21} />
                ) : (
                  <Sparkles size={21} />
                )}
              </div>
              <div>
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                <small>Récemment</small>
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
                  <span className="unread-dot" />
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
