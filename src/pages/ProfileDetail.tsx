import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, GraduationCap, Briefcase, Phone, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const profile = {
    id: id || "ODM-30775",
    gender: "male",
    fullName: "[Hidden until accepted]",
    age: 26,
    height: "5'7\"",
    weight: "65 kg",
    bloodGroup: "B+",
    skinTone: "Medium",
    district: "Jashore, Rajshahi, Bangladesh",
    maritalStatus: "Never Married",
    occupation: "Software Engineer",
    income: "40,000 BDT",
    education: "Bachelor's in CSE",
    sscYear: "2016",
    hscYear: "2018",
    university: "Rajshahi University",
    pray5times: "Yes",
    beard: "Yes",
    islamicMindset: "Practicing",
    quranReading: "Fluent",
    fatherAlive: "Yes",
    fatherOccupation: "Retired Govt. Employee",
    motherAlive: "Yes",
    motherOccupation: "Housewife",
    brothers: 2,
    sisters: 1,
    familyStatus: "Middle Class",
    prefAge: "20-25",
    prefLocation: "Any",
    prefEducation: "HSC+",
    prefPracticing: "Practicing",
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card rounded-xl border border-border p-5 md:p-6">
      <h3 className="text-lg font-semibold gradient-text mb-4 pb-2 border-b border-border">{title}</h3>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header card */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-4xl">
            {profile.gender === "male" ? "👨" : "👩"}
          </div>
          <div className="text-center md:text-left flex-1">
            <span className="text-xs font-medium text-primary bg-accent px-3 py-1 rounded-full">Biodata No: {profile.id}</span>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground justify-center md:justify-start">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.district}</span>
              <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {profile.education}</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {profile.occupation}</span>
            </div>
            <div className="flex gap-2 mt-4 justify-center md:justify-start">
              <Button className="gradient-primary text-primary-foreground border-0 gap-2"><Heart className="h-4 w-4" /> Send Interest</Button>
              <Button variant="outline" className="gap-2" onClick={() => { navigator.clipboard.writeText(window.location.href); toast({ title: "Link copied!" }); }}>
                <Copy className="h-4 w-4" /> Copy Biodata Link
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Section title="📍 Address">
            <InfoRow label="Permanent Address" value={profile.district} />
          </Section>

          <Section title="🧑‍💼 Personal Details">
            <InfoRow label="Marital Status" value={profile.maritalStatus} />
            <InfoRow label="Age" value={profile.age} />
            <InfoRow label="Height" value={profile.height} />
            <InfoRow label="Weight" value={profile.weight} />
            <InfoRow label="Blood Group" value={profile.bloodGroup} />
            <InfoRow label="Occupation" value={profile.occupation} />
            <InfoRow label="Monthly Income" value={profile.income} />
          </Section>

          <Section title="🎓 Educational Qualifications">
            <InfoRow label="Highest Education" value={profile.education} />
            <InfoRow label="SSC Year" value={profile.sscYear} />
            <InfoRow label="HSC Year" value={profile.hscYear} />
            <InfoRow label="University" value={profile.university} />
          </Section>

          <Section title="🕌 Religious Information">
            <InfoRow label="Pray 5 times" value={profile.pray5times} />
            <InfoRow label="Beard" value={profile.beard} />
            <InfoRow label="Islamic Mindset" value={profile.islamicMindset} />
            <InfoRow label="Quran Reading" value={profile.quranReading} />
          </Section>

          <Section title="👨‍👩‍👧 Family Information">
            <InfoRow label="Father alive" value={profile.fatherAlive} />
            <InfoRow label="Father's Occupation" value={profile.fatherOccupation} />
            <InfoRow label="Mother alive" value={profile.motherAlive} />
            <InfoRow label="Mother's Occupation" value={profile.motherOccupation} />
            <InfoRow label="Brothers" value={profile.brothers} />
            <InfoRow label="Sisters" value={profile.sisters} />
            <InfoRow label="Family Status" value={profile.familyStatus} />
          </Section>

          <Section title="❤️ Partner Preference">
            <InfoRow label="Preferred Age" value={profile.prefAge} />
            <InfoRow label="Preferred Location" value={profile.prefLocation} />
            <InfoRow label="Preferred Education" value={profile.prefEducation} />
            <InfoRow label="Practicing Level" value={profile.prefPracticing} />
          </Section>
        </div>
      </div>
    </main>
  );
};

export default ProfileDetail;
