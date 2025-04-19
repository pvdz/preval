# Preval test case

# loop_redundant.md

> Ref tracking > Done > While-if > Loop redundant
>
> Both strings should be replaced with an empty string (or a custom string indicating they can't be observed)

## Options

- refTest

## Input

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app"; // never observed, overwritten inside the loop
  let b = "jhayon.vercel.app"; // never observed, overwritten in both branches in the loop
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const h = b.length;
    $(h)
    c = c + 1;
    if (c > 10) break;
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
if ($) {
  /*4*/ let a___10__ = `jhayon.vercel.app`;
  let b___14__ = `jhayon.vercel.app`;
  let c___18__ = 1;
  const d___21__ = $(`x`);
  while ($LOOP_UNROLL_500___27__) {
    /*28*/ const tmpCallCompVal___35__ = d___37__.slice___38__;
    a___48__ = $dotCall___42__(tmpCallCompVal___43__, d___44__, `slice`, 0);
    const e___50__ = a___52__[0];
    const f___55__ = e___57__ === `.`;
    if (f___61__) {
      /*62*/ const tmpCallCompVal$1___65__ = a___67__.slice___68__;
      b___78__ = $dotCall___72__(tmpCallCompVal$1___73__, a___74__, `slice`, 1);
    } /*79*/ else {
      b___83__ = a___82__;
    }
    const h___85__ = b___87__.length___88__;
    $(h___92__);
    c___98__ = c___96__ + 1;
    const tmpIfTest___100__ = c___102__ > 10;
    if (tmpIfTest___105__) {
      /*106*/ break;
    } /*108*/ else {
    }
  }
} /*109*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
a:
  - w @10      | ########## | not read    | none           | 48
  - w @48      | ########## | 52,67,74,82 | 10,48          | 48
  - r @52      | 48
  - r @67      | 48
  - r @74      | 48
  - r @82      | 48

b:
  - w @14      | ########## | not read    | none           | 78,83
  - w @78      | ########## | 87          | 14,78,83       | 78,83
  - w @83      | ########## | 87          | 14,78,83       | 78,83
  - r @87      | 78,83

c:
  - w @18      | ########## | 96          | none           | 98
  - r @96      | 18,98
  - w @98      | ########## | 96,102      | 18,98          | 98
  - r @102     | 98

d:
  - w @21      | ########## | 37,44       | none           | none
  - r @37      | 21
  - r @44      | 21

tmpCallCompVal:
  - w @35          | ########## | 43          | none           | none
  - r @43          | 35

e:
  - w @50          | ########## | 57          | none           | none
  - r @57          | 50

f:
  - w @55          | ########## | 61          | none           | none
  - r @61          | 55

tmpCallCompVal$1:
  - w @65            | ########## | 73          | none           | none
  - r @73            | 65

h:
  - w @85            | ########## | 92          | none           | none
  - r @92            | 85

tmpIfTest:
  - w @100           | ########## | 105         | none           | none
  - r @105           | 100
