# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_logic_and_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $($(1)) && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    a = 2;
  }
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    a = 2;
  }
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same