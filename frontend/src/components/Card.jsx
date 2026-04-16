import * as React from "react";
import { cn } from "./utils";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-900 rounded-xl shadow p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid gap-1.5 px-6 pt-6",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className = "", ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardAction({ className = "", ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

export function CardFooter({ className = "", ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6", className)}
      {...props}
    />
  );
}
