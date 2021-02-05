# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > assignments > for_in_right > auto_ident_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = ($(1), $(2), x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  $(1);
  $(2);
  const tmpNestedComplexRhs = x;
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpForInDeclRhs;
$(1);
$(2);
const tmpNestedComplexRhs = x;
a = tmpNestedComplexRhs;
tmpForInDeclRhs = tmpNestedComplexRhs;
let x;
for (x in tmpForInDeclRhs) {
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ("<crash[ Cannot access 'x' before initialization ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'x' has already been declared ]>")
