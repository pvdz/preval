# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > For c > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (; $(1); $({ a: 1, b: 2 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
{
  while ($(1)) {
    $({ a: 1, b: 2 });
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpIfTest = $(1);
while (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  tmpCallCallee(tmpCalleeParam);
  tmpIfTest = $(1);
}
$(a);
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
while (tmpIfTest) {
  const tmpCalleeParam = { a: 1, b: 2 };
  $(tmpCalleeParam);
  tmpIfTest = $(1);
}
$(999);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 1
 - 4: { a: '1', b: '2' }
 - 5: 1
 - 6: { a: '1', b: '2' }
 - 7: 1
 - 8: { a: '1', b: '2' }
 - 9: 1
 - 10: { a: '1', b: '2' }
 - 11: 1
 - 12: { a: '1', b: '2' }
 - 13: 1
 - 14: { a: '1', b: '2' }
 - 15: 1
 - 16: { a: '1', b: '2' }
 - 17: 1
 - 18: { a: '1', b: '2' }
 - 19: 1
 - 20: { a: '1', b: '2' }
 - 21: 1
 - 22: { a: '1', b: '2' }
 - 23: 1
 - 24: { a: '1', b: '2' }
 - 25: 1
 - 26: { a: '1', b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
