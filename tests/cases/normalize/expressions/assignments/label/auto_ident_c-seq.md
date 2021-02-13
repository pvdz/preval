# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > assignments > label > auto_ident_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
label: a = ($(1), $(2), $(x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  a = $(x);
}
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  a = $(x);
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same