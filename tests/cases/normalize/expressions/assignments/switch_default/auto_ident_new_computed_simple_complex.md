# Preval test case

# auto_ident_new_computed_simple_complex.md

> normalize > expressions > assignments > switch_default > auto_ident_new_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new b[$("$")](1);
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    const tmpCompObj = b;
    const tmpCompProp = $('$');
    const tmpNewCallee = tmpCompObj[tmpCompProp];
    a = new tmpNewCallee(1);
  }
}
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    const tmpCompObj = b;
    const tmpCompProp = $('$');
    const tmpNewCallee = tmpCompObj[tmpCompProp];
    a = new tmpNewCallee(1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - 2: '$'
 - eval returned: ('<crash[ <ref> is not a constructor ]>')
