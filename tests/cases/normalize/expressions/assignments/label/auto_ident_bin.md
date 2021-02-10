# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > label > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = $(1) + $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
label: {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  a = tmpBinBothLhs + tmpBinBothRhs;
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
