# UI Component Library

This directory contains reusable UI components that eliminate duplication across the application.

## Components

### Button
A versatile button component with multiple variants and sizes.

```vue
<Button variant="primary" size="md" @click="handleClick">
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
- `size`: 'sm' | 'md' | 'lg'
- `type`: 'button' | 'submit' | 'reset'
- `disabled`: boolean

### StatusBadge
Displays task status with consistent styling.

```vue
<StatusBadge :status="task.status" />
```

**Props:**
- `status`: 'pending' | 'in_progress' | 'completed' | 'cancelled'

### PriorityBadge
Displays task priority with consistent styling.

```vue
<PriorityBadge :priority="task.priority" />
```

**Props:**
- `priority`: 'low' | 'medium' | 'high' | 'urgent'

### ProgressBar
A progress bar component with color-coded progress levels.

```vue
<ProgressBar :value="75" label="Completion" />
```

**Props:**
- `value`: number (0-100)
- `label`: string (optional)

### FormInput
A form input component with consistent styling and validation support.

```vue
<FormInput
  id="name"
  label="Name"
  v-model="form.name"
  type="text"
  required
  placeholder="Enter name"
/>
```

**Props:**
- `id`: string
- `label`: string (optional)
- `type`: string
- `modelValue`: string | number
- `placeholder`: string (optional)
- `required`: boolean
- `min/max/step`: number (optional)
- `disabled`: boolean
- `error`: string (optional)
- `helpText`: string (optional)

### FormSelect
A form select component with consistent styling.

```vue
<FormSelect
  id="status"
  label="Status"
  v-model="form.status"
  :options="statusOptions"
/>
```

**Props:**
- `id`: string
- `label`: string (optional)
- `modelValue`: string
- `options`: Array<{value: string, label: string}>
- `required`: boolean
- `disabled`: boolean
- `error`: string (optional)
- `helpText`: string (optional)

### FormTextarea
A form textarea component with consistent styling.

```vue
<FormTextarea
  id="description"
  label="Description"
  v-model="form.description"
  rows="4"
  placeholder="Enter description"
/>
```

**Props:**
- `id`: string
- `label`: string (optional)
- `modelValue`: string
- `rows`: number
- `placeholder`: string (optional)
- `required`: boolean
- `disabled`: boolean
- `error`: string (optional)
- `helpText`: string (optional)

### LoadingSpinner
A loading spinner component with customizable text.

```vue
<LoadingSpinner text="Loading data..." />
```

**Props:**
- `text`: string (optional, defaults to "Loading...")

### EmptyState
An empty state component for when there's no data to display.

```vue
<EmptyState
  title="No tasks"
  description="Get started by creating a new task."
>
  <template #action>
    <Button @click="createTask">Create Task</Button>
  </template>
</EmptyState>
```

**Props:**
- `title`: string
- `description`: string

**Slots:**
- `action`: Optional action button or content

### ErrorState
A reusable error state component for displaying errors, warnings, and info messages.

```vue
<ErrorState
  variant="error"
  title="Error Loading Data"
  message="Failed to fetch data from the server"
>
  <template #action>
    <Button @click="retry">Try Again</Button>
  </template>
</ErrorState>
```

**Props:**
- `title`: string (required) - Error title
- `message`: string (required) - Error message
- `variant`: 'error' | 'warning' | 'info' (optional, defaults to 'error')

**Slots:**
- `action`: Optional action button or content

### StatCard
A reusable statistics card component for displaying metrics and numbers.

```vue
<StatCard
  value="42"
  label="Active Users"
  color="blue"
/>
```

**Props:**
- `value`: number | string (required) - The statistic value to display
- `label`: string (required) - The label for the statistic
- `color`: 'blue' | 'yellow' | 'green' | 'gray' | 'red' | 'orange' (optional, defaults to 'gray')

**Usage Examples:**
```vue
<!-- Basic usage -->
<StatCard value="15" label="Pending Tasks" />

<!-- With custom color -->
<StatCard value="8" label="Completed" color="green" />

<!-- Dynamic values -->
<StatCard :value="userCount" label="Total Users" color="blue" />
```

### PageLayout
A reusable page layout component that provides consistent structure and spacing.

```vue
<PageLayout 
  title="Page Title"
  subtitle="Optional page subtitle"
>
  <template #header-actions>
    <Button variant="primary">Action</Button>
  </template>
  
  <!-- Page content goes here -->
  
  <template #page-actions>
    <Button variant="secondary">Bottom Action</Button>
  </template>
</PageLayout>
```

**Props:**
- `title`: string (required) - Page title displayed as H1
- `subtitle`: string (optional) - Page subtitle displayed below title

**Slots:**
- `default`: Page content
- `header-actions`: Optional actions displayed in the header (right side)
- `page-actions`: Optional actions displayed at the bottom of the page

## Usage

Import components individually or use the index file:

```vue
<script setup lang="ts">
// Individual imports
import { Button, StatusBadge, ProgressBar } from '@/components/ui'

// Or import all
import * as UI from '@/components/ui'
</script>
```

## Benefits

1. **Consistency**: All components use the same design system
2. **Maintainability**: Changes to styling are made in one place
3. **Reusability**: Components can be used across different views
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Accessibility**: Built-in accessibility features and ARIA support
6. **Performance**: Optimized components with proper Vue 3 patterns

## Customization

Components use Tailwind CSS classes and can be customized by:
- Modifying the component's default classes
- Passing custom classes via the `class` prop
- Extending the component's variants
- Using CSS custom properties for theming
