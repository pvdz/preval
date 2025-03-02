# Preval test case

# shift_push_mutations_unroll_once.md

> Arr mutation > Shift push mutations unroll once
>
> The point of this code is to rotate the array contents. It's a common obfuscation trick.
> This case points out a regression.
> The shift/push occurrences inside the loop were also being inlined but it shouldn't inside
> a loop unless the binding was also created inside that same loop.

## Input

`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_1) {      // The unrolled body is not in a loop so it can inline there (that's how we unroll this hack anyways)
  const test = $('never');
  if (test) {
    break;
  } else {
    const tmp = arr.shift();  // This statement should be kept
    arr.push(tmp);            // This statement should be kept (too)
  }
}
$(arr.slice(0));              // Don't let arr escape
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_1) {
  const test = $(`never`);
  if (test) {
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
  }
}
$(arr.slice(0));
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3, 4, 5];
while ($LOOP_UNROLL_1) {
  const test = $(`never`);
  if (test) {
    break;
  } else {
    const tmp = arr.shift();
    arr.push(tmp);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = arr.slice(0);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const test /*:unknown*/ = $(`never`);
const arr /*:array*/ = [1, 2, 3, 4, 5];
if (test) {
} else {
  const tmp /*:unknown*/ = arr.shift();
  arr.push(tmp);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const test$1 /*:unknown*/ = $(`never`);
    if (test$1) {
      break;
    } else {
      const tmp$1 /*:unknown*/ = arr.shift();
      arr.push(tmp$1);
    }
  }
}
const tmpCalleeParam /*:array*/ = arr.slice(0);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "never" );
const b = [ 1, 2, 3, 4, 5 ];
if (a) {

}
else {
  const c = b.shift();
  b.push( c );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const d = $( "never" );
    if (d) {
      break;
    }
    else {
      const e = b.shift();
      b.push( e );
    }
  }
}
const f = b.slice( 0 );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'never'
 - 2: [1, 2, 3, 4, 5]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
