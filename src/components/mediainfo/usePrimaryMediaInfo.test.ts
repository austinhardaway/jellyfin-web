import { describe, it, expect, vi } from 'vitest';
import usePrimaryMediaInfo from './usePrimaryMediaInfo';
import { renderHook } from '@testing-library/react';

vi.mock('../itemHelper', () => ({
    getDisplayName: vi.fn().mockReturnValue('Test Item')
}))

describe('usePrimaryMediaInfo', () => {
    it('should return an empty array when no options are enabled', () => {
        const item = {
            Type: 'Movie',
            MediaType: 'Video'
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item }));
        expect(result.current).toEqual([])
    });

});
