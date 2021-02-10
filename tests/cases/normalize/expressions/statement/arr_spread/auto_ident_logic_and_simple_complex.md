# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > statement > arr_spread > auto_ident_logic_and_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 && $($(1)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = 1;
if (tmpArrElToSpread) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
}
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
