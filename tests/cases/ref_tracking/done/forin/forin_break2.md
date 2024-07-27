# Preval test case

# forin_break2.md

> Ref tracking > Done > Forin > Forin break2
>
> bloop

## Input

`````js filename=intro
const wat = { a: 1, b: 2 };
for (const x in wat) {
  $(x);
  break;
}
$();
`````

## Pre Normal


`````js filename=intro
const wat = { a: 1, b: 2 };
{
  let tmpForInGen = $forIn(wat);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      const x = tmpForInNext.value;
      {
        $(x);
        break;
      }
    }
  }
}
$();
`````

## Normalized


`````js filename=intro
const wat = { a: 1, b: 2 };
let tmpForInGen = $forIn(wat);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const x = tmpForInNext.value;
    $(x);
    break;
  }
}
$();
`````

## Output


`````js filename=intro
const wat = { a: 1, b: 2 };
const tmpForInGen = $forIn(wat);
const tmpForInNext = tmpForInGen.next();
const tmpIfTest = tmpForInNext.done;
if (tmpIfTest) {
} else {
  const x = tmpForInNext.value;
  $(x);
}
$();
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $forIn( a );
const c = b.next();
const d = c.done;
if (d) {

}
else {
  const e = c.value;
  $( e );
}
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
