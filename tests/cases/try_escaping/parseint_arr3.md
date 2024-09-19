# Preval test case

# parseint_arr3.md

> Try escaping > Parseint arr3
>
> Note: parseInt does coerce the arg to a string so we must consider it potentially observable unless primitive

## Input

`````js filename=intro
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = arr[0]; // We can detect the type as string (or primitive) and assert not observable
  $(x);
  try {
    const y = parseInt(x); // Cannot throw without second arg so move it up
    if (y) {
      const el = arr.shift();
      arr.push(el);
    } else {
      break;
    }
  } catch (e) {
    $('keepme');
  }
}
$(arr[0]);
`````

## Pre Normal


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = arr[0];
  $(x);
  try {
    const y = parseInt(x);
    if (y) {
      const el = arr.shift();
      arr.push(el);
    } else {
      break;
    }
  } catch (e) {
    $(`keepme`);
  }
}
$(arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = arr[0];
  $(x);
  try {
    const y = parseInt(x);
    if (y) {
      const el = arr.shift();
      arr.push(el);
    } else {
      break;
    }
  } catch (e) {
    $(`keepme`);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = arr[0];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:primitive*/ = arr[0];
  $(x);
  const y /*:number*/ = parseInt(x);
  if (y) {
    const el = arr.shift();
    arr.push(el);
  } else {
    break;
  }
}
const tmpCalleeParam /*:primitive*/ = arr[0];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  $( b );
  const c = parseInt( b );
  if (c) {
    const d = a.shift();
    a.push( d );
  }
  else {
    break;
  }
}
const e = a[ 0 ];
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
