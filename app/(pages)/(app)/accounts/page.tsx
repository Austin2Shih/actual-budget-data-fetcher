"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTellerConnect } from 'teller-connect-react';
import { createEnrollmentAction } from "@/app/(api)/_actions/teller/enrollments/createEnrollment";
import useEnrollments from "../../_hooks/useEnrollments";

export default function AccountsPage() {
  const { open, ready } = useTellerConnect({
    applicationId: process.env.NEXT_PUBLIC_TELLER_APP_ID!,
    onSuccess: (authorization) => {
      console.log(JSON.stringify(authorization));
      console.log(authorization);
      createEnrollmentAction({
        enrollmentId: authorization.enrollment.id,
        accessToken: authorization.accessToken,
        bankName: authorization.enrollment.institution.name,
      })
    },
  })

  const {loading, enrollments, error} = useEnrollments();
  if (loading) {
    return 'loading...';
  }

  if (error) {
    return error;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">My Bank Accounts</h1>
        <Button onClick={() => open()} disabled={!ready}>Connect a bank account</Button>
      </div>

      {enrollments.map((enrollment) => (
        <Card key={enrollment.id} className="mb-4">
          <CardContent>
            <h2 className="font-semibold">{enrollment.bank_name}</h2>
            {/* <ul>
              {enrollment.accounts.map((acct: any) => (
                <li key={acct.id}>{acct.name} - {acct.subtype}</li>
              ))}
            </ul> */}
            <Button
              variant="destructive"
              className="mt-2"
              onClick={() => {}}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
