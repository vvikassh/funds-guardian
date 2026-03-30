import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockCategories, userProfile } from "@/data/mockData";
import { ArrowLeft, CreditCard, Smartphone, CheckCircle } from "lucide-react";
import { UPIPayment } from "@/components/UPIPayment";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUPIPayment, setShowUPIPayment] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const category = mockCategories.find(cat => cat.name === categoryParam);
      if (category) {
        setCategoryId(category.id);
      }
    }
    const methodParam = searchParams.get('method');
    if (methodParam) {
      setPaymentMethod(methodParam);
    }
  }, [searchParams]);

  const selectedCategory = mockCategories.find(cat => cat.id === categoryId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !categoryId || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "upi") {
      setShowUPIPayment(true);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `₹${amount} paid to ${selectedCategory?.name} via ${paymentMethod}`,
      });
      
      // Reset form
      setAmount("");
      setCategoryId("");
      setPaymentMethod("");
      setDescription("");
      setIsProcessing(false);
    }, 2000);
  };

  const handleUPIPaymentSuccess = (paymentDetails: any) => {
    // Reset form and navigate back
    setAmount("");
    setCategoryId("");
    setPaymentMethod("");
    setDescription("");
    setShowUPIPayment(false);
    navigate("/");
  };

  const handleUPICancel = () => {
    setShowUPIPayment(false);
  };

  const canAfford = selectedCategory && parseFloat(amount) <= selectedCategory.balance;
  const hasBalance = parseFloat(amount) <= userProfile.totalBalance;

  if (showUPIPayment) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setShowUPIPayment(false)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">UPI Payment</h1>
            <p className="text-muted-foreground">Complete your payment using UPI</p>
          </div>
        </div>
        
        <UPIPayment
          amount={parseFloat(amount)}
          category={selectedCategory?.name || ""}
          onPaymentSuccess={handleUPIPaymentSuccess}
          onCancel={handleUPICancel}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Make Payment</h1>
          <p className="text-muted-foreground">Deduct from your category budgets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 text-lg font-semibold"
                      required
                    />
                  </div>
                  {amount && !hasBalance && (
                    <p className="text-sm text-expense">Insufficient total balance</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{category.name}</span>
                            <span className="text-sm text-muted-foreground ml-4">
                              ₹{category.balance.toFixed(2)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCategory && amount && !canAfford && (
                    <p className="text-sm text-expense">
                      Insufficient category balance (₹{selectedCategory.balance.toFixed(2)} available)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          UPI Payment
                        </div>
                      </SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="wallet">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="What's this payment for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-hover"
                  disabled={!amount || !categoryId || !paymentMethod || !canAfford || !hasBalance || isProcessing}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {paymentMethod === "upi" ? "Pay with UPI" : "Process Payment"}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="space-y-4">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ₹{userProfile.totalBalance.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Available to spend
              </p>
            </CardContent>
          </Card>

          {selectedCategory && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Category Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <selectedCategory.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{selectedCategory.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    ₹{selectedCategory.balance.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of ₹{selectedCategory.budget.toFixed(2)} budget
                  </div>
                  {amount && (
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span>After payment:</span>
                        <span className={`font-medium ${
                          (selectedCategory.balance - parseFloat(amount)) < 0 
                            ? "text-expense" 
                            : "text-foreground"
                        }`}>
                          ₹{(selectedCategory.balance - (parseFloat(amount) || 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}