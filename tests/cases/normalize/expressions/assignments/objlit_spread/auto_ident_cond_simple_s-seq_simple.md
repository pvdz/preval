# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > assignments > objlit_spread > auto_ident_cond_simple_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = 1 ? (40, 50, 60) : $($(100))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
{
  a = 60;
}
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = 60;
}
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same