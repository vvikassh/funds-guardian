import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, CreditCard, Wallet, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UPIPaymentProps {
  amount: number;
  category: string;
  onPaymentSuccess: (paymentDetails: any) => void;
  onCancel: () => void;
}

const UPI_APPS = [
  { name: "Google Pay", id: "gpay", color: "bg-blue-600", icon: Wallet },
  { name: "PhonePe", id: "phonepe", color: "bg-purple-600", icon: Smartphone },
  { name: "Paytm", id: "paytm", color: "bg-blue-500", icon: CreditCard },
  { name: "Amazon Pay", id: "amazonpay", color: "bg-orange-500", icon: Wallet },
];

export function UPIPayment({ amount, category, onPaymentSuccess, onCancel }: UPIPaymentProps) {
  const [selectedUPI, setSelectedUPI] = useState<string>("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"select" | "confirm" | "processing" | "success">("select");
  const { toast } = useToast();

  const handleUPISelection = (upiApp: string) => {
    setSelectedUPI(upiApp);
    setPaymentStep("confirm");
  };

  const handlePayment = async () => {
    if (!selectedUPI && !upiId) {
      toast({
        title: "Error",
        description: "Please select a UPI app or enter UPI ID",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStep("processing");

    // Simulate UPI payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPaymentStep("success");
      
      // Simulate payment success after 2 seconds
      setTimeout(() => {
        const paymentDetails = {
          transactionId: `UPI${Date.now()}`,
          amount,
          category,
          paymentMethod: selectedUPI || "UPI ID",
          timestamp: new Date().toISOString(),
          status: "completed"
        };
        
        onPaymentSuccess(paymentDetails);
        
        toast({
          title: "Payment Successful!",
          description: `₹${amount} paid successfully to ${category}`,
        });
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive",
      });
      setPaymentStep("select");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderSelectStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose UPI App</h3>
        <div className="grid grid-cols-2 gap-3">
          {UPI_APPS.map((app) => {
            const IconComponent = app.icon;
            return (
              <Button
                key={app.id}
                variant="outline"
                className="h-16 flex flex-col gap-2 hover:shadow-md transition-all"
                onClick={() => handleUPISelection(app.id)}
              >
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", app.color)}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">{app.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div>
        <Label htmlFor="upi-id">Enter UPI ID</Label>
        <Input
          id="upi-id"
          placeholder="example@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="mt-1"
        />
        <Button 
          className="w-full mt-2" 
          onClick={() => handleUPISelection("custom")}
          disabled={!upiId}
        >
          Pay with UPI ID
        </Button>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Confirm Payment</h3>
        <p className="text-muted-foreground">Review your payment details</p>
      </div>

      <div className="bg-accent/20 rounded-lg p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-semibold">₹{amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Category:</span>
          <span className="font-semibold">{category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Method:</span>
          <span className="font-semibold">
            {selectedUPI === "custom" ? upiId : UPI_APPS.find(app => app.id === selectedUPI)?.name}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setPaymentStep("select")} className="flex-1">
          Back
        </Button>
        <Button onClick={handlePayment} className="flex-1" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
        <Smartphone className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">Processing Payment</h3>
        <p className="text-muted-foreground">Please complete the payment on your UPI app</p>
      </div>
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-success" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-success">Payment Successful!</h3>
        <p className="text-muted-foreground">Your payment has been processed</p>
      </div>
      <Badge variant="secondary" className="bg-success/10 text-success">
        Transaction ID: UPI{Date.now()}
      </Badge>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Smartphone className="w-5 h-5" />
          UPI Payment
        </CardTitle>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">₹{amount}</p>
          <p className="text-sm text-muted-foreground">to {category}</p>
        </div>
      </CardHeader>
      <CardContent>
        {paymentStep === "select" && renderSelectStep()}
        {paymentStep === "confirm" && renderConfirmStep()}
        {paymentStep === "processing" && renderProcessingStep()}
        {paymentStep === "success" && renderSuccessStep()}
        
        {paymentStep === "select" && (
          <Button variant="outline" onClick={onCancel} className="w-full mt-4">
            Cancel
          </Button>
        )}
      </CardContent>
    </Card>
  );
}