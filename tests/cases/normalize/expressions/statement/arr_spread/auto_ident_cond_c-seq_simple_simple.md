# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> normalize > expressions > statement > arr_spread > auto_ident_cond_c-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...((10, 20, $(30)) ? $(2) : $($(100)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpArrElToSpread = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
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
 - 1: 30
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
