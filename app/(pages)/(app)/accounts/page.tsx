"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTellerConnect } from 'teller-connect-react';
import { createEnrollmentAction } from "@/app/(api)/_actions/teller/enrollments/createEnrollment";
import useEnrollments from "../../_hooks/useEnrollments";
import { ManageAccountsModal } from "@pages/_components/ManageAccountsModal/ManageAccountsModal";

export default function AccountsPage() {
  const { open, ready } = useTellerConnect({
    applicationId: process.env.NEXT_PUBLIC_TELLER_APP_ID!,
    onSuccess: (authorization) => {
      createEnrollmentAction({
        enrollmentId: authorization.enrollment.id, 
        accessToken: authorization.accessToken,
        bankName: authorization.enrollment.institution.name,
      });
    },
  });

  const { loading, enrollments, error } = useEnrollments();

  if (loading) {
    return <div className="p-6">Loading enrollments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bank Accounts</h1>
        <Button onClick={() => open()} disabled={!ready}>Connect a Bank Account</Button>
      </div>

      <div className="space-y-6">
        {enrollments.map((enrollment) => (
          <Card key={enrollment.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{enrollment.bank_name}</CardTitle>
              <ManageAccountsModal enrollment={enrollment}>
                <Button variant="outline">Manage Accounts</Button>
              </ManageAccountsModal>
            </CardHeader>
            <CardContent>
              <h3 className="mb-2 font-semibold text-md">Synced Accounts</h3>
              {enrollment?.accounts?.length > 0 && enrollment.accounts ? (
                <ul className="space-y-1 list-disc list-inside">
                  {enrollment.accounts.map((acct: any) => (
                    <li key={acct.id} className="text-sm text-muted-foreground">
                      {acct.name} - <span className="capitalize">{acct.subtype.replace(/_/g, " ")}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No accounts have been added from this connection yet.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
