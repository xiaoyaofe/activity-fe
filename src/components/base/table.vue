/* 未完成 */
<template functional>
	<div class="table-wrap">
		<table :class="['table',props.className]">
			<caption v-if="props.caption" :class="['caption',props.className+'__caption']">{{props.caption}}</caption>
			<thead :class="['thead',props.className+'__thead']">
				<tr :class="['tr',props.className+'__tr']">
					<th :class="['th',props.className+'__th']">序号</th>
					<th :class="['th',props.className+'__th']">礼包名</th>
					<th :class="['th',props.className+'__th']">领取时间</th>
				</tr>
			</thead>
			<tbody :class="['tbody',props.className+'__tbody']">
				<tr :class="['tr',props.className+'__tr']">
					<td :class="['td',props.className+'__td']">1</td>
					<td :class="['td',props.className+'__td']">$100</td>
					<td :class="['td',props.className+'__td']">$100</td>
				</tr>
				<tr :class="['tr',props.className+'__tr']">
					<td :class="['td',props.className+'__td']">2</td>
					<td :class="['td',props.className+'__td']">$80</td>
					<td :class="['td',props.className+'__td']">$80</td>
				</tr>
				<tr :class="['tr',props.className+'__tr']">
					<td :class="['td',props.className+'__td']">3</td>
					<td :class="['td',props.className+'__td']">$80</td>
					<td :class="['td',props.className+'__td']">$80</td>
				</tr>
				<tr :class="['tr',props.className+'__tr']">
					<td :class="['td',props.className+'__td']">4</td>
					<td :class="['td',props.className+'__td']">$80</td>
					<td :class="['td',props.className+'__td']">$80</td>
				</tr>
			</tbody>
			<tfoot :class="['tfoot',props.className+'__tfoot']">
				<tr :class="['tr',props.className+'__tr']">
					<td colspan="3" :class="['td',props.className+'__td']">Tip:xxxxxx xxxx xxx xxxx</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
	export default {
		name: "RgTable",
		props: {
			className: {
				type: String,
				required: true
			},
			caption: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style>
	.table-wrap {
		width: 100%;
		height: 300px;
		overflow: auto;
		transform-origin: 0 0;
		transform: scale(0.5);
	}
	.table {
		box-sizing: border-box;
		width: 600px;
		max-width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		border-collapse: collapse;
	}
	.caption {
		padding-top: 8px;
		padding-bottom: 8px;
		color: #777;
		text-align: left;
	}
	.th {
		vertical-align: bottom;
		border-bottom: 2px solid #ddd;
		padding: 8px;
		line-height: 1.428;
	}
	.td {
		font-size: 1em;
		font-family: inherit;
		border-bottom: 1px solid grey;
		text-align: center;
		/* vertical-align: top; */
		padding: 0.5em;
	}
	.tbody .tr:nth-child(odd) {
		background-color: #f9f9f9;
	}
	.tfoot .td {
		border: none;
		text-align: left;
	}
</style>