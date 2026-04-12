import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle } from "lucide-react";

const steps = [
  "Basic Information",
  "Address",
  "Personal Details",
  "Religious Information",
  "Education",
  "Family Information",
  "Career",
  "Partner Preference",
  "Profile Media",
];

const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Full Name *</Label><Input placeholder="Enter your full name" value={formData.fullName || ""} onChange={(e) => updateField("fullName", e.target.value)} /></div>
              <div>
                <Label>Gender *</Label>
                <Select value={formData.gender || ""} onValueChange={(v) => updateField("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Date of Birth *</Label><Input type="date" value={formData.dob || ""} onChange={(e) => updateField("dob", e.target.value)} /></div>
              <div>
                <Label>Marital Status *</Label>
                <Select value={formData.maritalStatus || ""} onValueChange={(v) => updateField("maritalStatus", v)}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single (Never Married)</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widow">Widow/Widower</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Division *</Label>
                <Select value={formData.division || ""} onValueChange={(v) => updateField("division", v)}>
                  <SelectTrigger><SelectValue placeholder="Select division" /></SelectTrigger>
                  <SelectContent>{divisions.map((d) => <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>District *</Label><Input placeholder="Enter district" value={formData.district || ""} onChange={(e) => updateField("district", e.target.value)} /></div>
              <div><Label>Upazila (Optional)</Label><Input placeholder="Enter upazila" value={formData.upazila || ""} onChange={(e) => updateField("upazila", e.target.value)} /></div>
            </div>
            <div><Label>Present Address</Label><Textarea placeholder="Enter present address" value={formData.presentAddress || ""} onChange={(e) => updateField("presentAddress", e.target.value)} /></div>
            <div><Label>Permanent Address</Label><Textarea placeholder="Enter permanent address" value={formData.permanentAddress || ""} onChange={(e) => updateField("permanentAddress", e.target.value)} /></div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Height (ft) *</Label><Input placeholder='e.g. 5 feet 7 inch' value={formData.height || ""} onChange={(e) => updateField("height", e.target.value)} /></div>
              <div><Label>Weight (kg)</Label><Input placeholder="e.g. 65" value={formData.weight || ""} onChange={(e) => updateField("weight", e.target.value)} /></div>
              <div>
                <Label>Blood Group</Label>
                <Select value={formData.bloodGroup || ""} onValueChange={(v) => updateField("bloodGroup", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Occupation *</Label><Input placeholder="Enter occupation" value={formData.occupation || ""} onChange={(e) => updateField("occupation", e.target.value)} /></div>
              <div><Label>Monthly Income</Label><Input placeholder="e.g. 30000" value={formData.income || ""} onChange={(e) => updateField("income", e.target.value)} /></div>
              <div>
                <Label>Skin Tone (Optional)</Label>
                <Select value={formData.skinTone || ""} onValueChange={(v) => updateField("skinTone", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Any Disability?</Label>
                <RadioGroup value={formData.disability || "no"} onValueChange={(v) => updateField("disability", v)} className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2"><RadioGroupItem value="no" id="dis-no" /><Label htmlFor="dis-no">No</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="dis-yes" /><Label htmlFor="dis-yes">Yes</Label></div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label>Do you pray 5 times a day? *</Label>
              <RadioGroup value={formData.pray5times || ""} onValueChange={(v) => updateField("pray5times", v)} className="flex gap-4 mt-2">
                <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="pray-yes" /><Label htmlFor="pray-yes">Yes</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="no" id="pray-no" /><Label htmlFor="pray-no">No</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="sometimes" id="pray-some" /><Label htmlFor="pray-some">Sometimes</Label></div>
              </RadioGroup>
            </div>
            {formData.gender === "male" && (
              <div>
                <Label>Do you keep a beard?</Label>
                <RadioGroup value={formData.beard || ""} onValueChange={(v) => updateField("beard", v)} className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="beard-yes" /><Label htmlFor="beard-yes">Yes</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="no" id="beard-no" /><Label htmlFor="beard-no">No</Label></div>
                </RadioGroup>
              </div>
            )}
            {formData.gender === "female" && (
              <div>
                <Label>Do you wear Hijab/Niqab?</Label>
                <Select value={formData.hijab || ""} onValueChange={(v) => updateField("hijab", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hijab">Hijab</SelectItem>
                    <SelectItem value="niqab">Niqab</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Islamic Mindset *</Label>
              <Select value={formData.islamicMindset || ""} onValueChange={(v) => updateField("islamicMindset", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="practicing">Practicing</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quran Reading Ability</Label>
              <Select value={formData.quranReading || ""} onValueChange={(v) => updateField("quranReading", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fluent">Fluent</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="cannot">Cannot Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Highest Education *</Label>
                <Select value={formData.highestEducation || ""} onValueChange={(v) => updateField("highestEducation", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssc">SSC</SelectItem>
                    <SelectItem value="hsc">HSC</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's</SelectItem>
                    <SelectItem value="masters">Master's</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="hafiz">Hafiz</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>SSC Passing Year</Label><Input placeholder="e.g. 2015" value={formData.sscYear || ""} onChange={(e) => updateField("sscYear", e.target.value)} /></div>
              <div><Label>HSC Passing Year</Label><Input placeholder="e.g. 2017" value={formData.hscYear || ""} onChange={(e) => updateField("hscYear", e.target.value)} /></div>
              <div><Label>University / Institute</Label><Input placeholder="Enter institution name" value={formData.university || ""} onChange={(e) => updateField("university", e.target.value)} /></div>
              <div><Label>Subject</Label><Input placeholder="Enter subject" value={formData.subject || ""} onChange={(e) => updateField("subject", e.target.value)} /></div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Is your father alive?</Label>
                <RadioGroup value={formData.fatherAlive || ""} onValueChange={(v) => updateField("fatherAlive", v)} className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="fa-yes" /><Label htmlFor="fa-yes">Yes</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="no" id="fa-no" /><Label htmlFor="fa-no">No</Label></div>
                </RadioGroup>
              </div>
              <div><Label>Father's Occupation</Label><Input placeholder="Enter occupation" value={formData.fatherOccupation || ""} onChange={(e) => updateField("fatherOccupation", e.target.value)} /></div>
              <div>
                <Label>Is your mother alive?</Label>
                <RadioGroup value={formData.motherAlive || ""} onValueChange={(v) => updateField("motherAlive", v)} className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="ma-yes" /><Label htmlFor="ma-yes">Yes</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="no" id="ma-no" /><Label htmlFor="ma-no">No</Label></div>
                </RadioGroup>
              </div>
              <div><Label>Mother's Occupation</Label><Input placeholder="Enter occupation" value={formData.motherOccupation || ""} onChange={(e) => updateField("motherOccupation", e.target.value)} /></div>
              <div><Label>Number of Brothers</Label><Input type="number" min="0" value={formData.brothers || ""} onChange={(e) => updateField("brothers", e.target.value)} /></div>
              <div><Label>Number of Sisters</Label><Input type="number" min="0" value={formData.sisters || ""} onChange={(e) => updateField("sisters", e.target.value)} /></div>
              <div>
                <Label>Family Financial Status</Label>
                <Select value={formData.familyStatus || ""} onValueChange={(v) => updateField("familyStatus", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lower">Lower Class</SelectItem>
                    <SelectItem value="middle">Middle Class</SelectItem>
                    <SelectItem value="upper-middle">Upper Middle Class</SelectItem>
                    <SelectItem value="upper">Upper Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Current Job Title</Label><Input placeholder="Enter job title" value={formData.jobTitle || ""} onChange={(e) => updateField("jobTitle", e.target.value)} /></div>
              <div><Label>Company Name</Label><Input placeholder="Enter company" value={formData.company || ""} onChange={(e) => updateField("company", e.target.value)} /></div>
              <div><Label>Work Experience (years)</Label><Input placeholder="e.g. 3" value={formData.experience || ""} onChange={(e) => updateField("experience", e.target.value)} /></div>
              <div>
                <Label>Sector</Label>
                <Select value={formData.sector || ""} onValueChange={(v) => updateField("sector", v)}>
                  <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT / Software</SelectItem>
                    <SelectItem value="garments">Garments</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="banking">Banking</SelectItem>
                    <SelectItem value="teaching">Teaching</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Preferred Age Range</Label><Input placeholder="e.g. 22-28" value={formData.prefAge || ""} onChange={(e) => updateField("prefAge", e.target.value)} /></div>
              <div>
                <Label>Preferred Location</Label>
                <Select value={formData.prefLocation || ""} onValueChange={(v) => updateField("prefLocation", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{divisions.map((d) => <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preferred Education</Label>
                <Select value={formData.prefEducation || ""} onValueChange={(v) => updateField("prefEducation", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="ssc">SSC+</SelectItem>
                    <SelectItem value="hsc">HSC+</SelectItem>
                    <SelectItem value="bachelors">Bachelor's+</SelectItem>
                    <SelectItem value="masters">Master's+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preferred Practicing Level</Label>
                <Select value={formData.prefPracticing || ""} onValueChange={(v) => updateField("prefPracticing", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="practicing">Practicing</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Other Expectations</Label><Textarea placeholder="Write any additional expectations..." value={formData.expectations || ""} onChange={(e) => updateField("expectations", e.target.value)} /></div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <div>
              <Label>Profile Photo *</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <p className="text-muted-foreground text-sm">Click or drag to upload your photo</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG (Max 5MB)</p>
                <Input type="file" accept="image/*" className="mt-3" />
              </div>
            </div>
            <div>
              <Label>Additional Photos (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <p className="text-muted-foreground text-sm">Upload additional photos</p>
                <Input type="file" accept="image/*" multiple className="mt-3" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Create Your <span className="gradient-text">Biodata</span></h1>
        <p className="text-muted-foreground text-center text-sm mb-8">Fill in your details to find your perfect match</p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => setCurrentStep(i)}
                className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                  i === currentStep
                    ? "gradient-primary text-primary-foreground"
                    : i < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div className={`w-4 md:w-8 h-0.5 ${i < currentStep ? "bg-primary/40" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span className="gradient-text">{currentStep + 1}.</span> {steps[currentStep]}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Please fill in the required fields</p>

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prev} disabled={currentStep === 0}>Previous</Button>
            {currentStep === steps.length - 1 ? (
              <Button className="gradient-primary text-primary-foreground border-0">Submit Biodata</Button>
            ) : (
              <Button className="gradient-primary text-primary-foreground border-0" onClick={next}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
