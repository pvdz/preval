# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_new_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new (1, 2, $(b))["$"](1);
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
    1;
    2;
    const tmpCompObj = $(b);
    const tmpNewCallee = tmpCompObj.$;
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
    1;
    2;
    const tmpCompObj = $(b);
    const tmpNewCallee = tmpCompObj.$;
    a = new tmpNewCallee(1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not a constructor ]>')
