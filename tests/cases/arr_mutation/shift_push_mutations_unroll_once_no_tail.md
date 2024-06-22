# Preval test case

# shift_push_mutations_unroll_once_no_tail.md

> Arr mutation > Shift push mutations unroll once no tail
>
> The point of this code is to rotate the array contents. It's a common obfuscation trick.
> This case points out a regression.
> The shift/push occurrences inside the loop were also being inlined but it shouldn't inside
> a loop unless the binding was also created inside that same loop.

## Input

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_2) {      // The unrolled body is not in a loop so it can inline there (that's how we unroll this hack anyways)
  const test = $('never');
  if (test) {
    break;
  } else {
    const tmp = arr.shift();  // This statement should be kept
    arr.push(tmp);            // This statement should be kept (too)
  }
}
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_2) {
  const test = $(`never`);
  if (test) {
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
  }
}
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_2) {
  const test = $(`never`);
  if (test) {
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
  }
}
`````

## Output


`````js filename=intro
const test = $(`never`);
if (test) {
} else {
  const arr = [2, 3, 4, 5, 1];
  while ($LOOP_UNROLL_1) {
    const test$1 = $(`never`);
    if (test$1) {
      break;
    } else {
      const tmp$1 = arr.shift();
      arr.push(tmp$1);
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "never" );
if (a) {

}
else {
  const b = [ 2, 3, 4, 5, 1 ];
  while ($LOOP_UNROLL_1) {
    const c = $( "never" );
    if (c) {
      break;
    }
    else {
      const d = b.shift();
      b.push( d );
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'never'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
