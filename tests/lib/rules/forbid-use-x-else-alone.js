/**
 * @fileoverview x-else should have a x-if or x-elseif ahead
 * @author tony7lee
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/forbid-use-x-else-alone'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});
ruleTester.run('forbid-use-x-else-alone', rule, {
  valid: [
    {
      code: `
          <div>
              <div x-if={this.state.foo}>1</div>
              <div x-elseif={this.state.bar}>1</div>
              <div x-elseif={this.state.boo}>1</div>
              <div x-else>1</div>
          </div>
        `
    },
    {
      code: `
            <div>
                <div x-if={this.state.foo}>1</div>

                <div x-elseif={this.state.bar}>1</div>
  
                <div x-else>1</div>
            </div>
          `
    }
  ],

  invalid: [
    {
      code: `
        <div>
            <div x-else>1</div>
        </div>
      `,
      errors: [
        {
          message: 'x-else should have a x-if or x-elseif ahead'
        }
      ]
    },
    {
      code: `
          <div>
              <div x-if={this.state.foo}>1</div>
              <div x-else>1</div>
              <div x-else>2</div>
          </div>
        `,
      errors: [
        {
          message: 'x-else should have a x-if or x-elseif ahead'
        }
      ]
    },
    {
        code: `
            <div>
                <div x-if={this.state.foo}>1</div>
                <div>1</div>
                <div x-else>2</div>
            </div>
          `,
        errors: [
          {
            message: 'x-else should have a x-if or x-elseif ahead'
          }
        ]
      }
  ]
});
