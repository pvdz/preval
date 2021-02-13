# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > assignments > for_in_right > auto_ident_delete_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = delete ($(1), $(2), $(arg)).y));
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpForInDeclRhs = a;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, x_1);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpForInDeclRhs = a;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a, x_1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true, undefined
 - eval returned: undefined

Normalized calls: BAD?!
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Final output calls: BAD!!
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - eval returned: ('<crash[ <ref> is not defined ]>')
