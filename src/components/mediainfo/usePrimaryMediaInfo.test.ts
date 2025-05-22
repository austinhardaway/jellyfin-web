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

    it('should include TrackCount when provided with itemSongCount', () => {
        const item = {
            Type: 'MusicAlbum',
            MediaType: 'Audio',
            SongCount: 5
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showFolderRuntimeInfo: true }));
        expect(result.current).toEqual([{ text: 'TrackCount' }]);
    });

    it('should include TrackCount when provided with itemChildCount', () => {
        const item = {
            Type: 'Playlist',
            MediaType: 'Video',
            ChildCount: 5
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showFolderRuntimeInfo: true }));
        expect(result.current).toEqual([{ text: 'TrackCount' }]);
    });

    it('should include Runtime when provided with itemRuntimeTicks', () => {
        const item = {
            Type: 'Playlist',
            MediaType: 'Video',
            RunTimeTicks: 750000000
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showFolderRuntimeInfo: true }));
        expect(result.current).toEqual([{ text: '1m' }]);
    });

    it('should include ItemCount for BoxSets with provided ChildCount', () => {
        const item = {
            Type: 'BoxSet',
            MediaType: 'Video',
            ChildCount: 22
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showItemCountInfo: true }));
        expect(result.current).toEqual([{ text: 'ItemCount' }]);
    });

    it('should include ItemCount for PhotoAlbums with provided ChildCount', () => {
        const item = {
            Type: 'PhotoAlbum',
            MediaType: 'Photo',
            ChildCount: 22
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showItemCountInfo: true }));
        expect(result.current).toEqual([{ text: 'ItemCount' }]);
    });


    it('should include original air date info when showOriginalAirDateInfo is true', () => {
        const item = {
            Type: 'Episode',
            MediaType: 'Video',
            PremiereDate: '2021-01-01T00:00:00Z',
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showOriginalAirDateInfo: true }))
        expect(result.current).toEqual([{ text: '1/1/2021' }]);
    });


    it('should include series timer info when showSeriesTimerInfo is true', () => {
        const item = {
            Type: 'SeriesTimer',
            RecodedAnyTime: false,
            StartDate: '2021-01-01T00:00:00Z',
            RecordAnyChannel: true,
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showSeriesTimerInfo: true }))
        expect(result.current).toEqual([{ text: '6:00 PM'}, {text: 'AllChannels' }]);

    });


    it('should include start date info when showStartDateInfo is true', () => {
        const item = {
            Type: 'Recording',
            MediaType: 'Video',
            StartDate: '2021-01-01T12:00:00Z',
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showStartDateInfo: true }))
        expect(result.current).toEqual([{ text: '1/1/2021' }]);
    });


    it('should include year info when showYearInfo is true', () => {
        const item = {
            Type: 'Movie',
            MediaType: 'Video',
            ProductionYear: 2021,
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showYearInfo: true }));
        expect(result.current).toEqual([{ text: 2021 }]);
    });

    it('should include runtime info when showRuntimeInfo is true for audio', () => {
        const item = {
            Type: 'Audio',
            MediaType: 'Audio',
            RunTimeTicks: 7200000000,
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showFolderRuntimeInfo: false, showRuntimeInfo: true }));
        expect(result.current).toEqual([{ text: '12:00' }]); 
    });

    it('should include runtime info when showRuntimeInfo is true for non-audio', () => {
        const item = {
            Type: 'Movie',
            MediaType: 'Video',
            RunTimeTicks: 7200000000,
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showFolderRuntimeInfo: false, showRuntimeInfo: true }));
        expect(result.current).toEqual([{ text: '12m' }]); 
    });
    
    it('should include official rating info when showOfficialRatingInfo is true', () => {
        const item = {
            Type: 'Movie',
            OfficialRating: 'PG-13',
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showOfficialRatingInfo: true }))
        expect(result.current).toEqual([{ text: 'PG-13', cssClass: 'mediaInfoText mediaInfoOfficialRating' }]);
    });

    it('should include 3D format info when showVideo3DFormatInfo is true', () => {
        const item = {
            Video3DFormat: '3D',
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showVideo3DFormatInfo: true }))
        expect(result.current).toEqual([{ text: '3D' }]);
    });

    it('should include photo size info when showPhotoSizeInfo is true', () => {
        const item = {
            MediaType: 'Photo',
            Width: 1920,
            Height: 1080,
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showPhotoSizeInfo: true }))
        expect(result.current).toEqual([{ text: '1920x1080' }]);
    });


    it('should include Audio Container info when showAudioContainerInfo is true', () => {
        const item = {
            MediaType: 'Audio',
            Type: 'Audio',
            Container: 'MP3',
        } as any;

        const { result } = renderHook(() => usePrimaryMediaInfo({ item, showAudioContainerInfo: true }))
        expect(result.current).toEqual([{ text: 'MP3' }]);
    })
});
