# Preval test case

# scoping.md

> normalize > for > regular > scoping
>
> The var decl in a for-header has its own scope so our transform should not break that

#TODO

## Input

`````js filename=intro
const x = 1;
for (const x = 2;;) $(x);
`````

## Normalized

`````js filename=intro
const x = 1;
{
  const x = 2;
  while (true) {
    $(x);
  }
}
`````

## Output

`````js filename=intro
const x = 1;
const x = 2;
while (true) {
  $(x);
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'x' has already been declared ]>")
