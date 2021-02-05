# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > statement > arr_spread > auto_ident_cond_simple_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 ? (40, 50, $(60)) : $($(100)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
if (1) {
  40;
  50;
  tmpArrElToSpread = $(60);
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
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
tmpArrElToSpread = $(60);
[...tmpArrElToSpread];
$(a);
`````

## Result

Should call `$` with:
 - 1: 60
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
