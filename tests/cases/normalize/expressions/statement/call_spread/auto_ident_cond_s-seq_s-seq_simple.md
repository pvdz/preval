# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > statement > call_spread > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...((10, 20, 30) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpCalleeParamSpread = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam = $(100);
  tmpCalleeParamSpread = tmpCallCallee$1(tmpCalleeParam);
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
