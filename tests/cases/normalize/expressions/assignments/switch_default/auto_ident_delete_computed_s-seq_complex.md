# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > assignments > switch_default > auto_ident_delete_computed_s-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = delete ($(1), $(2), x)[$("y")];
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    $(1);
    $(2);
    const tmpDeleteCompObj = x;
    const tmpDeleteCompProp = $('y');
    a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  }
}
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
