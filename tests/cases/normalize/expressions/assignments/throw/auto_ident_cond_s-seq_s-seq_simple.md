# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > assignments > throw > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = (10, 20, 30) ? (40, 50, 60) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
if (30) {
  a = 60;
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 60 ]>')

Normalized calls: Same

Final output calls: Same