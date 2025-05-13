import { Level } from './types'

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "The Terraform Novice",
    minXp: 0,
    maxXp: 100,
    mission: "The Awakening",
    challenges: [
      { 
        id: 1, 
        name: "Install Terraform & set up your CLI", 
        xp: 10, 
        completed: false, 
        type: 'challenge', 
        level: 1,
        resources: [
          { name: "Terraform Install Docs", url: "https://developer.hashicorp.com/terraform/downloads" },
          { name: "YouTube Install Guide", url: "https://www.youtube.com/watch?v=V4waklkBC38" }
        ]
      },
      { 
        id: 2, 
        name: "Understand Infrastructure as Code (IaC) basics", 
        xp: 10, 
        completed: false, 
        type: 'challenge', 
        level: 1,
        resources: [
          { name: "What is IaC?", url: "https://developer.hashicorp.com/terraform/intro" },
          { name: "IaC for Beginners", url: "https://www.youtube.com/watch?v=MXnsfVQdQOE" }
        ]
      },
      { 
        id: 3, 
        name: "Write your first Terraform file (main.tf)", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 1,
        resources: [
          { name: "Create EC2 Instance", url: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-build" },
          { name: "Katacoda Lab", url: "https://www.katacoda.com/courses/terraform/getting-started" }
        ]
      },
      { 
        id: 4, 
        name: "Use terraform init, plan, and apply", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 1,
        resources: [
          { name: "Terraform CLI Reference", url: "https://developer.hashicorp.com/terraform/cli" },
          { name: "Terraform CLI Cheat Sheet", url: "https://spacelift.io/blog/terraform-cheat-sheet" }
        ]
      }
    ],
    bossFight: { 
      id: 5, 
      name: "Create and destroy a basic AWS EC2 instance", 
      xp: 30, 
      completed: false, 
      type: 'boss', 
      level: 1,
      resources: [
        { name: "YouTube: Create and Destroy EC2", url: "https://www.youtube.com/watch?v=SLB_c_ayRMo" }
      ]
    },
    reward: "Unlock your first Terraform badge + ASCII sword"
  },
  {
    id: 2,
    name: "Apprentice Architect",
    minXp: 101,
    maxXp: 200,
    mission: "Tools of the Trade",
    challenges: [
      { 
        id: 6, 
        name: "Learn about Providers and Resources", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 2,
        resources: [
          { name: "Provider Configuration", url: "https://developer.hashicorp.com/terraform/language/providers/configuration" },
          { name: "YouTube: Providers Explained", url: "https://www.youtube.com/watch?v=Xm4LX5fJKZ8" }
        ]
      },
      { 
        id: 7, 
        name: "Add Variables and Outputs to a config", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 2,
        resources: [
          { name: "Terraform Variables", url: "https://developer.hashicorp.com/terraform/language/values/variables" },
          { name: "Terraform Outputs", url: "https://developer.hashicorp.com/terraform/language/values/outputs" },
          { name: "YouTube: Variables in Terraform", url: "https://www.youtube.com/watch?v=qK7xU1G7Cz8" }
        ]
      },
      { 
        id: 8, 
        name: "Use .tfvars and workspaces", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 2,
        resources: [
          { name: "Variable Definitions Files", url: "https://developer.hashicorp.com/terraform/language/values/variables#variable-definitions-tfvars-files" },
          { name: "Terraform Workspaces", url: "https://developer.hashicorp.com/terraform/cloud-docs/workspaces" }
        ]
      },
      { 
        id: 9, 
        name: "Structure your Terraform project like a pro", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 2,
        resources: [
          { name: "Terraform File Structure Guide", url: "https://medium.com/@toricor/terraform-best-practices-file-structure-7b5b364ef4f2" },
          { name: "GitHub: Starter Template", url: "https://github.com/wardviaene/terraform-course" }
        ]
      }
    ],
    bossFight: { 
      id: 10, 
      name: "Create a VPC with public/private subnets and EC2", 
      xp: 20, 
      completed: false, 
      type: 'boss', 
      level: 2,
      resources: [
        { name: "Terraform AWS VPC Module", url: "https://github.com/terraform-aws-modules/terraform-aws-vpc" },
        { name: "YouTube: Create VPC with Terraform", url: "https://www.youtube.com/watch?v=V2kV7C1Kj9w" }
      ]
    },
    reward: "Terraform CLI Cheatsheet + Cloud Mapper Role"
  },
  {
    id: 3,
    name: "Infrastructure Engineer",
    minXp: 201,
    maxXp: 300,
    mission: "Terraform the World",
    challenges: [
      { 
        id: 11, 
        name: "Use terraform import and taint", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 3,
        resources: [
          { name: "Import Existing Resources", url: "https://developer.hashicorp.com/terraform/cli/import" },
          { name: "Taint Command Guide", url: "https://developer.hashicorp.com/terraform/cli/commands/taint" },
          { name: "YouTube: Terraform Import Demo", url: "https://www.youtube.com/watch?v=dG79RZkKyn4" }
        ]
      },
      { 
        id: 12, 
        name: "Understand Terraform State & Remote Backends", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 3,
        resources: [
          { name: "Terraform S3 Backend", url: "https://developer.hashicorp.com/terraform/language/settings/backends/s3" },
          { name: "YouTube: Remote State with Locking", url: "https://www.youtube.com/watch?v=YyF20uU0n_A" }
        ]
      },
      { 
        id: 13, 
        name: "Use terraform validate, fmt, and graph", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 3,
        resources: [
          { name: "Validate & Format Commands", url: "https://developer.hashicorp.com/terraform/cli/commands/validate" },
          { name: "Graph Visualization", url: "https://developer.hashicorp.com/terraform/cli/commands/graph" },
          { name: "YouTube: Terraform DevOps Tools", url: "https://www.youtube.com/watch?v=Qa9qJ7Gci1c" }
        ]
      }
    ],
    bossFight: { 
      id: 14, 
      name: "Manage state in an S3 backend with locking via DynamoDB", 
      xp: 30, 
      completed: false, 
      type: 'boss', 
      level: 3,
      resources: [
        { name: "Backend with S3 Lab", url: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-remote" },
        { name: "State Locking Guide", url: "https://www.terraform.io/language/settings/backends/s3#dynamodb-state-locking" }
      ]
    },
    reward: "Free access to an advanced IaC project template"
  },
  {
    id: 4,
    name: "Terraform Craftsman",
    minXp: 301,
    maxXp: 400,
    mission: "Modularity and Reusability",
    challenges: [
      { 
        id: 15, 
        name: "Write a basic module", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 4,
        resources: [
          { name: "Terraform Modules", url: "https://developer.hashicorp.com/terraform/language/modules/develop" },
          { name: "YouTube: Build Terraform Modules", url: "https://www.youtube.com/watch?v=3W0gx0k-1bE" }
        ]
      },
      { 
        id: 16, 
        name: "Create reusable networking and compute modules", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 4,
        resources: [
          { name: "Terraform Registry Modules", url: "https://registry.terraform.io/browse/modules" },
          { name: "Modular Examples on GitHub", url: "https://github.com/terraform-aws-modules" }
        ]
      },
      { 
        id: 17, 
        name: "Publish your module to a GitHub repo", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 4,
        resources: [
          { name: "Module Versioning Best Practices", url: "https://developer.hashicorp.com/terraform/language/modules/sources#versioning" },
          { name: "Publish to Terraform Registry", url: "https://developer.hashicorp.com/terraform/registry/modules/publish" }
        ]
      }
    ],
    bossFight: { 
      id: 18, 
      name: "Create a 3-tier app architecture using modules", 
      xp: 20, 
      completed: false, 
      type: 'boss', 
      level: 4,
      resources: [
        { name: "Example Project", url: "https://github.com/wardviaene/terraform-course/tree/master/terraform-3tier-app" },
        { name: "Deploy Full Stack Infra with Modules", url: "https://www.youtube.com/watch?v=JY1eWslPuR8" }
      ]
    },
    reward: "Module Master Title + Terraform Module Skeleton Generator"
  },
  {
    id: 5,
    name: "Automation Adept",
    minXp: 401,
    maxXp: 500,
    mission: "The CI/CD Trials",
    challenges: [
      { 
        id: 19, 
        name: "Automate Terraform via GitHub Actions or GitLab CI", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 5,
        resources: [
          { name: "Terraform + GitHub Actions Tutorial", url: "https://github.com/hashicorp/setup-terraform" },
          { name: "YouTube: Automate Terraform with GitHub Actions", url: "https://www.youtube.com/watch?v=mtZSTVqf3vw" }
        ]
      },
      { 
        id: 20, 
        name: "Add linting & validation steps in CI pipeline", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 5,
        resources: [
          { name: "Checkov Terraform Scanner", url: "https://www.checkov.io/" },
          { name: "Tfsec for Static Code Analysis", url: "https://aquasecurity.github.io/tfsec/" }
        ]
      },
      { 
        id: 21, 
        name: "Learn terraform destroy best practices", 
        xp: 20, 
        completed: false, 
        type: 'challenge', 
        level: 5,
        resources: [
          { name: "Terraform Destroy Guide", url: "https://developer.hashicorp.com/terraform/cli/commands/destroy" },
          { name: "Safety Patterns Before Destroy", url: "https://blog.gruntwork.io/how-to-use-terraform-safely-effectively-a2c21c52f755" }
        ]
      }
    ],
    bossFight: { 
      id: 22, 
      name: "Fully automate the deployment of an entire cloud environment", 
      xp: 30, 
      completed: false, 
      type: 'boss', 
      level: 5,
      resources: [
        { name: "End-to-End GitHub CI Example", url: "https://github.com/terraform-aws-modules/terraform-aws-ci" }
      ]
    },
    reward: "Pipeline Paladin Badge + DevOps meme sticker pack"
  },
  {
    id: 6,
    name: "The DevOps Sage",
    minXp: 501,
    maxXp: 1000,
    mission: "Choose Your Destiny",
    challenges: [
      { 
        id: 23, 
        name: "Try Terraform with GCP or Azure", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 6,
        resources: [
          { name: "Terraform on Azure", url: "https://learn.microsoft.com/en-us/azure/developer/terraform/" },
          { name: "Terraform on GCP", url: "https://cloud.google.com/docs/terraform" },
          { name: "YouTube: GCP Infra with Terraform", url: "https://www.youtube.com/watch?v=GFfh5xK8xDE" }
        ]
      },
      { 
        id: 24, 
        name: "Learn Sentinel (policy as code)", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 6,
        resources: [
          { name: "Sentinel Docs", url: "https://developer.hashicorp.com/sentinel" },
          { name: "Intro to Sentinel with Terraform", url: "https://learn.hashicorp.com/tutorials/terraform/sentinel-policies" }
        ]
      },
      { 
        id: 25, 
        name: "Integrate with Packer, Vault, or Ansible", 
        xp: 30, 
        completed: false, 
        type: 'challenge', 
        level: 6,
        resources: [
          { name: "Terraform + Vault (Secrets Mgmt)", url: "https://developer.hashicorp.com/vault/tutorials/identity-access-management/iam-authentication" },
          { name: "Terraform + Packer Workflow", url: "https://developer.hashicorp.com/packer/docs" }
        ]
      }
    ],
    bossFight: { 
      id: 26, 
      name: "Design a production-ready infrastructure for a startup", 
      xp: 110, 
      completed: false, 
      type: 'boss', 
      level: 6,
      resources: [
        { name: "Terraform AWS Reference Architecture", url: "https://github.com/terraform-aws-modules/terraform-aws-reference-architecture" },
        { name: "Free Portfolio-Ready Project Guide", url: "https://blog.ronin.cloud/terraform-reference-architecture-f7d85f2200e5" }
      ]
    },
    reward: "Cloud Commander Title + Portfolio-ready Terraform repo"
  }
] 