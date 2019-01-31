# coding: utf-8

"""
    Swagger Petstore */ ' \" =end -- \\r\\n \\n \\r

    This spec is mainly for testing Petstore server and contains fake endpoints, models. Please do not use this for any other purpose. Special characters: \" \\  */ ' \" =end --       

    OpenAPI spec version: 1.0.0 */ ' \" =end -- \\r\\n \\n \\r
    Contact: apiteam@swagger.io */ ' \" =end -- \\r\\n \\n \\r
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""


from __future__ import absolute_import

import sys
import os
import re

# python 2 and python 3 compatibility library
from six import iteritems

from ..api_client import ApiClient


class FakeApi(object):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def test_code_inject____end__rn_n_r(self, **kwargs):
        """
        To test code injection */ ' \" =end -- \\r\\n \\n \\r
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async=True
        >>> thread = api.test_code_inject____end__rn_n_r(async=True)
        >>> result = thread.get()

        :param async bool
        :param str test_code_inject____end____rn_n_r: To test code injection */ ' \" =end -- \\r\\n \\n \\r
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async'):
            return self.test_code_inject____end__rn_n_r_with_http_info(**kwargs)
        else:
            (data) = self.test_code_inject____end__rn_n_r_with_http_info(**kwargs)
            return data

    def test_code_inject____end__rn_n_r_with_http_info(self, **kwargs):
        """
        To test code injection */ ' \" =end -- \\r\\n \\n \\r
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async=True
        >>> thread = api.test_code_inject____end__rn_n_r_with_http_info(async=True)
        >>> result = thread.get()

        :param async bool
        :param str test_code_inject____end____rn_n_r: To test code injection */ ' \" =end -- \\r\\n \\n \\r
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['test_code_inject____end____rn_n_r']
        all_params.append('async')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method test_code_inject____end__rn_n_r" % key
                )
            params[key] = val
        del params['kwargs']


        collection_formats = {}

        path_params = {}

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}
        if 'test_code_inject____end____rn_n_r' in params:
            form_params.append(('test code inject */ &#39; &quot; &#x3D;end -- \r\n \n \r', params['test_code_inject____end____rn_n_r']))

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.\
            select_header_accept(['application/json', '*/  \" =end --       '])

        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.\
            select_header_content_type(['application/json', '*/  \" =end --       '])

        # Authentication setting
        auth_settings = []

        return self.api_client.call_api('/fake', 'PUT',
                                        path_params,
                                        query_params,
                                        header_params,
                                        body=body_params,
                                        post_params=form_params,
                                        files=local_var_files,
                                        response_type=None,
                                        auth_settings=auth_settings,
                                        async=params.get('async'),
                                        _return_http_data_only=params.get('_return_http_data_only'),
                                        _preload_content=params.get('_preload_content', True),
                                        _request_timeout=params.get('_request_timeout'),
                                        collection_formats=collection_formats)