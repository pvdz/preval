# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > statement > switch_default > auto_ident_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    (1, 2, $(b)).c;
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    ('default case:');
    1;
    2;
    const tmpCompObj = $(b);
    tmpCompObj.c;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(1);
const tmpCompObj = $(b);
tmpCompObj.c;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
