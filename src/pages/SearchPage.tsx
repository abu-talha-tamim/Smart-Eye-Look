import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MapPin, GraduationCap, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

const mockProfiles = [
  { id: "ODM-30775", gender: "male", age: 26, height: "5'7\"", district: "Dhaka", education: "Bachelor's", occupation: "Software Engineer", practicing: "Practicing", maritalStatus: "Single" },
  { id: "ODM-30776", gender: "female", age: 23, height: "5'3\"", district: "Chittagong", education: "Master's", occupation: "Teacher", practicing: "Practicing", maritalStatus: "Single" },
  { id: "ODM-30777", gender: "male", age: 28, height: "5'9\"", district: "Rajshahi", education: "Bachelor's", occupation: "Business", practicing: "Moderate", maritalStatus: "Single" },
  { id: "ODM-30778", gender: "female", age: 24, height: "5'4\"", district: "Sylhet", education: "HSC", occupation: "Homemaker", practicing: "Practicing", maritalStatus: "Single" },
  { id: "ODM-30779", gender: "male", age: 30, height: "5'10\"", district: "Khulna", education: "Master's", occupation: "Doctor", practicing: "Practicing", maritalStatus: "Divorced" },
  { id: "ODM-30780", gender: "female", age: 22, height: "5'2\"", district: "Dhaka", education: "Bachelor's", occupation: "Student", practicing: "Moderate", maritalStatus: "Single" },
];

const SearchPage = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  return (
    <main className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Search <span className="gradient-text">Biodata</span></h1>
        <p className="text-muted-foreground text-center text-sm mb-8">Find your perfect match using filters</p>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <Select onValueChange={(v) => setFilters((p) => ({ ...p, gender: v }))}>
              <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Groom</SelectItem>
                <SelectItem value="female">Bride</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Min Age" type="number" onChange={(e) => setFilters((p) => ({ ...p, minAge: e.target.value }))} />
            <Input placeholder="Max Age" type="number" onChange={(e) => setFilters((p) => ({ ...p, maxAge: e.target.value }))} />
            <Select onValueChange={(v) => setFilters((p) => ({ ...p, district: v }))}>
              <SelectTrigger><SelectValue placeholder="District" /></SelectTrigger>
              <SelectContent>
                {["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button className="gradient-primary text-primary-foreground border-0 gap-2">
              <SearchIcon className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProfiles.map((profile) => (
            <div key={profile.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full gradient-primary-light flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{profile.gender === "male" ? "👨" : "👩"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary bg-accent px-2 py-0.5 rounded-full">Biodata No: {profile.id}</span>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.district}</p>
                    <p className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {profile.education}</p>
                    <p>Age: {profile.age} • {profile.height} • {profile.maritalStatus}</p>
                    <p className="text-xs">{profile.practicing} Muslim</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Link to={`/profile/${profile.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">View Biodata</Button>
                </Link>
                <Button size="sm" className="flex-1 gradient-primary text-primary-foreground border-0 text-xs gap-1">
                  <Heart className="h-3 w-3" /> Send Interest
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
