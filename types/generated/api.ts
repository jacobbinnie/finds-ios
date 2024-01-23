/* tslint:disable */
/* eslint-disable */
/**
 * Finds
 * The Finds API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface CreateUserDto
 */
export interface CreateUserDto {
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    'firstname': string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface FindDto
 */
export interface FindDto {
    /**
     * 
     * @type {number}
     * @memberof FindDto
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof FindDto
     */
    'review': string;
    /**
     * 
     * @type {string}
     * @memberof FindDto
     */
    'rating': string;
    /**
     * 
     * @type {PlaceDto}
     * @memberof FindDto
     */
    'place': PlaceDto;
    /**
     * 
     * @type {Array<string>}
     * @memberof FindDto
     */
    'images': Array<string>;
    /**
     * 
     * @type {ProfileDto}
     * @memberof FindDto
     */
    'user': ProfileDto;
    /**
     * 
     * @type {string}
     * @memberof FindDto
     */
    'createdAt': string;
}
/**
 * 
 * @export
 * @interface PlaceDto
 */
export interface PlaceDto {
    /**
     * 
     * @type {number}
     * @memberof PlaceDto
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof PlaceDto
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof PlaceDto
     */
    'address': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof PlaceDto
     */
    'categories': Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PlaceDto
     */
    'googleMapsUri': string;
    /**
     * 
     * @type {string}
     * @memberof PlaceDto
     */
    'googlePlaceId': string;
}
/**
 * 
 * @export
 * @interface PlaceWithFindsDto
 */
export interface PlaceWithFindsDto {
    /**
     * 
     * @type {Array<FindDto>}
     * @memberof PlaceWithFindsDto
     */
    'finds': Array<FindDto>;
}
/**
 * 
 * @export
 * @interface ProfileDto
 */
export interface ProfileDto {
    /**
     * 
     * @type {number}
     * @memberof ProfileDto
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    'username': string;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    'firstname': string;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    'avatar'?: string;
}
/**
 * 
 * @export
 * @interface UserProfileDto
 */
export interface UserProfileDto {
    /**
     * 
     * @type {number}
     * @memberof UserProfileDto
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof UserProfileDto
     */
    'username': string;
    /**
     * 
     * @type {string}
     * @memberof UserProfileDto
     */
    'avatar'?: string;
    /**
     * 
     * @type {number}
     * @memberof UserProfileDto
     */
    'followers': number;
    /**
     * 
     * @type {Array<FindDto>}
     * @memberof UserProfileDto
     */
    'finds': Array<FindDto>;
}

/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLogin: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {CreateUserDto} createUserDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerRegisterUser: async (createUserDto: CreateUserDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createUserDto' is not null or undefined
            assertParamExists('authControllerRegisterUser', 'createUserDto', createUserDto)
            const localVarPath = `/auth/register`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createUserDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerReshToken: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/refresh`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerLogin(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerLogin(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AuthApi.authControllerLogin']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {CreateUserDto} createUserDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerRegisterUser(createUserDto: CreateUserDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerRegisterUser(createUserDto, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AuthApi.authControllerRegisterUser']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authControllerReshToken(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authControllerReshToken(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AuthApi.authControllerReshToken']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerLogin(options?: any): AxiosPromise<void> {
            return localVarFp.authControllerLogin(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CreateUserDto} createUserDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerRegisterUser(createUserDto: CreateUserDto, options?: any): AxiosPromise<void> {
            return localVarFp.authControllerRegisterUser(createUserDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authControllerReshToken(options?: any): AxiosPromise<void> {
            return localVarFp.authControllerReshToken(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerLogin(options?: RawAxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerLogin(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CreateUserDto} createUserDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerRegisterUser(createUserDto: CreateUserDto, options?: RawAxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerRegisterUser(createUserDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authControllerReshToken(options?: RawAxiosRequestConfig) {
        return AuthApiFp(this.configuration).authControllerReshToken(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * FindsApi - axios parameter creator
 * @export
 */
export const FindsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findsControllerAllFinds: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/finds/all`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * FindsApi - functional programming interface
 * @export
 */
export const FindsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = FindsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findsControllerAllFinds(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FindDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findsControllerAllFinds(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['FindsApi.findsControllerAllFinds']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * FindsApi - factory interface
 * @export
 */
export const FindsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = FindsApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findsControllerAllFinds(options?: any): AxiosPromise<Array<FindDto>> {
            return localVarFp.findsControllerAllFinds(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * FindsApi - object-oriented interface
 * @export
 * @class FindsApi
 * @extends {BaseAPI}
 */
export class FindsApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FindsApi
     */
    public findsControllerAllFinds(options?: RawAxiosRequestConfig) {
        return FindsApiFp(this.configuration).findsControllerAllFinds(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * PlacesApi - axios parameter creator
 * @export
 */
export const PlacesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        placesControllerGetPlaceByGoogleId: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('placesControllerGetPlaceByGoogleId', 'id', id)
            const localVarPath = `/place/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PlacesApi - functional programming interface
 * @export
 */
export const PlacesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PlacesApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async placesControllerGetPlaceByGoogleId(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PlaceWithFindsDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.placesControllerGetPlaceByGoogleId(id, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlacesApi.placesControllerGetPlaceByGoogleId']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * PlacesApi - factory interface
 * @export
 */
export const PlacesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PlacesApiFp(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        placesControllerGetPlaceByGoogleId(id: string, options?: any): AxiosPromise<PlaceWithFindsDto> {
            return localVarFp.placesControllerGetPlaceByGoogleId(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PlacesApi - object-oriented interface
 * @export
 * @class PlacesApi
 * @extends {BaseAPI}
 */
export class PlacesApi extends BaseAPI {
    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlacesApi
     */
    public placesControllerGetPlaceByGoogleId(id: string, options?: RawAxiosRequestConfig) {
        return PlacesApiFp(this.configuration).placesControllerGetPlaceByGoogleId(id, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersControllerGetProfile: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('usersControllerGetProfile', 'id', id)
            const localVarPath = `/user/profile/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersControllerGetProfile(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserProfileDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersControllerGetProfile(id, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['UsersApi.usersControllerGetProfile']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UsersApiFp(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersControllerGetProfile(id: string, options?: any): AxiosPromise<UserProfileDto> {
            return localVarFp.usersControllerGetProfile(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public usersControllerGetProfile(id: string, options?: RawAxiosRequestConfig) {
        return UsersApiFp(this.configuration).usersControllerGetProfile(id, options).then((request) => request(this.axios, this.basePath));
    }
}



