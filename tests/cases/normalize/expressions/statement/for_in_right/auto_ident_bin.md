# Preval test case

# auto_ident_bin.md

> normalize > expressions > statement > for_in_right > auto_ident_bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in $(1) + $(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  const tmpForInDeclRhs = tmpBinBothLhs + tmpBinBothRhs;
  let x;
  for (x in tmpForInDeclRhs) {
  }
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
