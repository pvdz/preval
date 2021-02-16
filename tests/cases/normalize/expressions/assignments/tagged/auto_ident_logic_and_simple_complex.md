# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > assignments > tagged > auto_ident_logic_and_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 1 && $($(1)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = 1;
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$2 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$2);
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
a = 1;
if (a) {
  const tmpCalleeParam$2 = $(1);
  a = $(tmpCalleeParam$2);
}
const tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
