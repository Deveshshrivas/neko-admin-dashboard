import { useEffect, useState } from 'react'
import { getCurrentBranch } from '../lib/schema'

export function useBranchListener() {
  const [branchId, setBranchId] = useState(getCurrentBranch())

  useEffect(() => {
    const handleBranchChange = (e: any) => {
      setBranchId(e.detail.branchId)
    }

    window.addEventListener('branchChanged', handleBranchChange)
    return () => window.removeEventListener('branchChanged', handleBranchChange)
  }, [])

  return branchId
}
